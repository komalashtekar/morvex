const express = require('express');

const cors = require('cors');

const nodemailer = require('nodemailer');

require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());

/*
========================================
SMTP CONFIGURATION
========================================
*/

let transporter;
let usingTestAccount = false;

function createSmtpTransport(host, port, secure) {
  return nodemailer.createTransport({ 
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    },
    logger: process.env.SMTP_DEBUG === 'true',
    debug: process.env.SMTP_DEBUG === 'true'
  });
}

function verifyTransporter(transporterInstance) {
  return new Promise((resolve, reject) => {
    transporterInstance.verify((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function initTransporter() {
  const hasCredentials = process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD;

  if (!hasCredentials || process.env.FORCE_TEST_MAIL === 'true') {
    // Use Ethereal for local testing when no SMTP credentials are provided
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    usingTestAccount = true;
    console.log('No SMTP credentials found — using Ethereal test account for email.');
    console.log('Ethereal user:', testAccount.user);
    await verifyTransporter(transporter);
    console.log('Ethereal transporter is ready to send messages');
    return;
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  console.log('Using SMTP settings:', {
    host,
    port,
    secure,
    user: process.env.SMTP_EMAIL
  });

  transporter = createSmtpTransport(host, port, secure);

  try {
    await verifyTransporter(transporter);
    console.log('SMTP transporter is ready to send messages');
    return;
  }
  catch (error) {
    console.error('Primary SMTP verification failed:', error && error.message ? error.message : error);

    if (host === 'smtp.titan.email') {
      const fallbackPort = port === 465 ? 587 : 465;
      const fallbackSecure = fallbackPort === 465;
      console.log(`Trying Titan SMTP port ${fallbackPort} ${fallbackSecure ? 'with SSL' : 'with STARTTLS'}...`);
      transporter = createSmtpTransport(host, fallbackPort, fallbackSecure);

      try {
        await verifyTransporter(transporter);
        console.log(`Titan SMTP port ${fallbackPort} is ready to send messages`);
        return;
      }
      catch (fallbackErr) {
        console.error(`Titan port ${fallbackPort} verification failed:`, fallbackErr && fallbackErr.message ? fallbackErr.message : fallbackErr);
      }
    }

    if (host === 'smtp.titan.email') {
      console.log('Trying GoDaddy alternative SMTP host smtpout.secureserver.net:465...');
      transporter = createSmtpTransport('smtpout.secureserver.net', 465, true);
      await verifyTransporter(transporter);
      console.log('smtpout.secureserver.net:465 is ready to send messages');
      return;
    }

    throw new Error(`SMTP transporter initialization failed: ${error && error.message ? error.message : String(error)}`);
  }
}

// We'll initialize transporter before starting the server (see below)


/*
========================================
CONTACT API
========================================
*/

app.post('/api/contact', async (req, res) => {

  try {

    const {
      name,
      companyName,
      contactNumber,
      email,
      requirement
    } = req.body;

    const info = await transporter.sendMail({
      from: process.env.SMTP_EMAIL || 'no-reply@example.com',
      to: 'sales@morvexindia.com',
      subject: 'New Enquiry from MORVEX Website',
      html: `
        <div style="font-family:Arial;padding:20px;">
          <h2 style="color:#1e3a8a;">New Website Enquiry</h2>
          <table
            border="1"
            cellpadding="10"
            cellspacing="0"
            style="border-collapse:collapse;width:100%;">
            <tr>
              <td><b>Name</b></td>
              <td>${name}</td>
            </tr>
            <tr>
              <td><b>Company Name</b></td>
              <td>${companyName}</td>
            </tr>
            <tr>
              <td><b>Contact Number</b></td>
              <td>${contactNumber}</td>
            </tr>
            <tr>
              <td><b>Email</b></td>
              <td>${email}</td>
            </tr>
            <tr>
              <td><b>Requirement</b></td>
              <td>${requirement}</td>
            </tr>
          </table>
        </div>
      `
    });

    if (usingTestAccount) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log('Ethereal preview URL:', previewUrl);
    }

    res.status(200).send({ success: true, message: 'Email Sent Successfully' });

  }
  catch(error) {

    console.log('MAIL ERROR');

    console.error(error && error.stack ? error.stack : error);

    // If it's an authentication error, try sending via Ethereal for local testing
    const isAuthError = (err) => {
      if (!err) return false;
      const msg = (err.message || '').toString();
      return msg.includes('Invalid login') || msg.includes('EAUTH') || err.responseCode === 535 || msg.includes('Authentication');
    };

    if (isAuthError(error)) {
      try {
        console.log('Auth error detected — attempting to resend using Ethereal test account...');
        const testAccount = await nodemailer.createTestAccount();
        const testTransporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: { user: testAccount.user, pass: testAccount.pass }
        });

        const info = await testTransporter.sendMail({
          from: process.env.SMTP_EMAIL || testAccount.user,
          to: 'sales@morvexindia.com',
          subject: 'New Enquiry from MORVEX Website (fallback)',
          html: `
            <div style="font-family:Arial;padding:20px;">
              <h2 style="color:#1e3a8a;">New Website Enquiry (fallback)</h2>
              <table border="1" cellpadding="10" cellspacing="0" style="border-collapse:collapse;width:100%;">
                <tr><td><b>Name</b></td><td>${req.body.name}</td></tr>
                <tr><td><b>Company Name</b></td><td>${req.body.companyName}</td></tr>
                <tr><td><b>Contact Number</b></td><td>${req.body.contactNumber}</td></tr>
                <tr><td><b>Email</b></td><td>${req.body.email}</td></tr>
                <tr><td><b>Requirement</b></td><td>${req.body.requirement}</td></tr>
              </table>
            </div>
          `
        });

        const previewUrl = nodemailer.getTestMessageUrl(info);
        console.log('Ethereal fallback sent. Preview URL:', previewUrl);
        return res.status(200).send({ success: true, message: 'Email sent using Ethereal fallback', previewUrl });
      }
      catch(fallbackErr) {
        console.error('Ethereal fallback failed:', fallbackErr && fallbackErr.stack ? fallbackErr.stack : fallbackErr);
        return res.status(500).send({ success: false, message: 'Mail auth failed and Ethereal fallback failed', error: fallbackErr && fallbackErr.message ? fallbackErr.message : String(fallbackErr) });
      }
    }

    res.status(500).send({ success: false, message: error && error.message ? error.message : String(error) });

  }

});

/*
========================================
START SERVER
========================================
*/

initTransporter()
  .then(() => {
    app.listen(5000, () => {
      console.log('SERVER RUNNING ON PORT 5000');
    });
  })
  .catch(err => {
    console.error('Failed to initialize mail transporter:', err && err.message ? err.message : err);
    console.error('Aborting startup because SMTP configuration is invalid or unavailable.');
    process.exit(1);
  });