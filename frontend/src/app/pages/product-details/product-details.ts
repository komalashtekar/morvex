import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, RouterModule } from '@angular/router';

import { PRODUCTS } from '../../data/products';

@Component({
  selector: 'app-product-details',
   standalone: true,

  imports: [
    CommonModule,
    RouterModule
  ],

  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {

   product: any;

  relatedProducts: any[];

  constructor(private route: ActivatedRoute) {

    const id =
      Number(this.route.snapshot.paramMap.get('id'));

    this.product =
      PRODUCTS.find(x => x.id === id);

    this.relatedProducts =
      PRODUCTS.filter(x => x.id !== id);

  }
}
