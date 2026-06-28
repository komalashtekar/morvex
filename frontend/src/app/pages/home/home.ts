import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PRODUCTS } from '../../data/products';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnDestroy {

  activeSlide = 0;

  slideTimer: any;

  slides = [
    '/assets/images/slide1.png',
    '/assets/images/slide2.jpeg',
    '/assets/images/slide3.png',
    '/assets/images/slide4.png',
  ];

  products = PRODUCTS;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  preview(productId: number) {
    this.router.navigate(['/product', productId]);
  }

   ngOnInit(): void {
    this.slideTimer = setInterval(() => {
      this.nextSlide();
    }, 3000); // 3 seconds
  }

nextSlide() {
  this.activeSlide = (this.activeSlide + 1) % this.slides.length;
  this.cdr.detectChanges();
}

  ngOnDestroy(): void {
    if (this.slideTimer) {
      clearInterval(this.slideTimer);
    }
  }

  trackByIndex(index: number) {
  return index;
}

}
