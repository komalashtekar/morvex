import { Component } from '@angular/core';

import { PRODUCTS } from '../../data/products';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

   products = PRODUCTS;

  nilkamalProducts = this.products.filter(
    x => x.category === 'nilkamal'
  );

  rentProducts = this.products.filter(
    x => x.category === 'rent'
  );

  saleProducts = this.products.filter(
    x => x.category === 'sale'
  );

}
