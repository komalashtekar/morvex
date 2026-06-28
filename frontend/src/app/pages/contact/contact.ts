import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,

  imports: [
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      requirement: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.http.post(
      'http://localhost:5000/api/contact',
      this.contactForm.value
    ).subscribe(() => {
      alert('Enquiry Submitted Successfully');
      this.contactForm.reset();
    }, () => {
      alert('Failed to submit enquiry. Please try again later.');
    });
  }

}
