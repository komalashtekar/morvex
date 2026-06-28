import { Product } from '../models/product';

export const PRODUCTS: Product[] = [

   {
    id: 4,
    name: 'Manual Cleaning Machines',
    category: 'cleaning',
    image: '/assets/images/manual.jpeg',
    description: ['Manual Push Sweepers: Often used for driveways, warehouses, and pavements. ',
      'As you walk and push, the turning wheels drive a belt/gear system that rotates front side brushes and a main roller brush. ',
      'These brushes flick loose dirt, leaves, and litter into an onboard dirt hopper.',
      ' Advanced models even utilize a patented vacuum fan mechanism that uses the kinetic energy of the turning wheels to suppress and capture fine dust'],
    images: ['/assets/images/manual.jpeg']
  },


  {
    id: 5,
    name: 'Ride-On Cleaning Machines',
    category: 'cleaning',
    image: '/assets/images/Ride-On Floor Scrubber.png',
    description: [ 'Heavy-duty motorized cleaning machine for large commercial and industrial areas.',
    'Battery-operated (Gel, Standard or Lithium-ion) for quiet and emission-free operation.',
    'Separate fresh water and recovery tanks.',
    'Water recycling technology reduces refill time.',
    'Ideal for warehouses, factories, malls and airports.'],
    images: ['/assets/images/Ride-On Floor Scrubber.png', '/assets/images/ride-on floor sweeper.png']
  },

  {
    id: 6,
    name: 'Walk-Behind Cleaning Machines',
    category: 'cleaning',
    image: '/assets/images/Walk Behind Scrubber Dryer.png',
    description: ['Powered by long-life batteries for wireless operation or power cords for continuous use.',
  'Solution tank holds clean water and cleaning chemicals.',
  'Scrub deck with rotating brushes or pads removes dirt and grime effectively.',
  'Rear squeegee and vacuum motor collect dirty water into a separate recovery tank.',
  'Provides efficient cleaning with quick drying for commercial and industrial floors.',
  'Ideal for warehouses, hospitals, malls, factories, airports, and large commercial spaces.'],
    images: ['/assets/images/Walk Behind Scrubber Dryer.png']
  },

  {
    id: 7,
    name: 'Hand Pallet Truck',
    category: 'HPT',
    image: 'assets/images/hand-operated pallet trucks.png',

    description:['Load Capacity: Typically ranges from 2,000 kg to 3,000 kg (2 to 3 tons), though heavy-duty models can hold up to 5,000 kg.',
      'Forks: Standard fork sizes are usually around 1150 mm (length) by 550 mm (width) to fit standard pallets.',
    'Wheels: Often equipped with nylon, polyurethane (PU), or solid rubber wheels to protect floors and reduce noise'],
      

    images: [
      'assets/images/hand-operated pallet trucks.png'
    ]
  },

  {
    id: 8,
    name: 'Dock Levellers',
    category: 'loading-bay',
    image: '/assets/images/dockleveler.png',
    description: ['A dock leveler is a height-adjustable platform used as a bridge between a loading dock and a truck or trailer bed.',
      ' Designed to compensate for the varying heights of transport vehicles, it enables industrial equipment like forklifts and pallet jacks to safely and efficiently move goods in and out.',
    'Capacity: 6 tons to 10 tons.'],
    images: ['/assets/images/dockleveler.png']
  },


  {
    id: 10,
    name: 'HVLS Fans',
    category: 'HVLS',
    image: '/assets/images/fan.png',
    description: ['An HVLS (High-Volume, Low-Speed) fan is a massive ceiling fan engineered to circulate large volumes of air gently across wide spaces.',
      'Fan sizes: 12 feet to 24 feet in diameter, suitable for warehouses, factories, and large commercial areas.'
    ],
    images: ['/assets/images/fan.png']
  },

  {
    id: 11,
    name: 'Plastic Crates & Bins',
    category: 'warehouse',
    image: '/assets/images/Morvex500 X 325plastic storage crates.png',
    description: ['Plastic crates and bins are durable, reusable containers made from heavy-duty plastics like polypropylene or polyethylene.',
      ' Designed for exceptional versatility, they safely store, organize, and transport goods across industrial, commercial, and residential settings',
    'Sizes: Available in various dimensions, including 500 x 325 mm, to accommodate different storage needs.',],
    images: ['/assets/images/Morvex500 X 325plastic storage crates.png']
  },

  {
    id: 12,
    name: 'Hydraulic Lift Tables',
    category: 'warehouse',
    image: '/assets/images/hydraulic lift table.png',
     description: [
    'Load capacity from 250 kg to 5,000 kg.',
    'Custom models available up to 25,000 kg.',
    'Velocity fuse prevents sudden platform drop.',
    'Pressure relief valve protects against overload.',
    'Safety maintenance bar for secure servicing.',
    'Suitable for warehouses and production lines.'
  ],
    images: ['/assets/images/hydraulic lift table.png']
  },
  {
    id: 13,
    name: 'Thermography Testing',
    category: 'warehouse',
    image: '/assets/images/thermo.png',
    description: ['We deliver reliable electrical engineering, thermography, testing, and maintenance services for industrial and commercial facilities. We help improve safety, minimize downtime, and enhance equipment reliability through expert solutions.',
      'Infrared Thermography Inspection',
      'LT Electrical Installation Testing',
      'MCC, PCC & Control Panel Installation',
      'Power Distribution & Cable Laying',
      'Industrial Wiring & Load Balancing',
      'Earthing & Lightning Protection',
      'Preventive & Breakdown Maintenance',
      'Testing & Commissioning (IR, Earth, Cable & Continuity Testing)'
    ],
    images: ['/assets/images/thermo.png']
  },

  {
    id: 14,
    name: 'Stationary Products',
    category: 'warehouse',
    image: '/assets/images/stationary.png',
    description: ['We provide a wide range of high-quality stationary products for all your office needs. From pens and pencils to notebooks and organizers, our stationary products are designed to enhance productivity and creativity.',
      'Available for 24/7 delivery, ensuring you never run out of essential supplies.'],
    images: ['/assets/images/stationary.png']
  },

  {
    id: 15,
    name: 'Consumables Products',
    category: 'warehouse',
    image: '/assets/images/consumables.png',
    description: ['We offer a comprehensive selection of consumable products for various industries, including cleaning supplies, packaging materials, and safety equipment. Our consumables are sourced from trusted manufacturers to ensure quality and reliability.',
      'Available for 24/7 delivery, ensuring you have the necessary supplies when you need them.'],
    images: ['/assets/images/consumables.png']
  },
  {
    id: 16,
    name: 'Safety Products',
    category: 'warehouse',
    image: '/assets/images/safety.png',
    description: ['We provide a wide range of high-quality safety products for all your industrial needs. From protective gear to safety equipment, our products are designed to ensure a secure working environment.',
      'Available for 24/7 delivery, ensuring you have the necessary safety supplies when you need them.'],
    images: ['/assets/images/safety.png']
  }

];