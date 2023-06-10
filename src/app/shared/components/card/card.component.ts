import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() img: string = '';
  @Input() productName: string = '';
  @Input() price: string = '';
  @Input() prodId: number = 0;
  @Input() description: string[] = [];
 
  quantity: number = 1;
  constructor(
    private router: Router
  ) {}

  addToCartProduct() {
    this.router.navigate([`cart`])
  }

  // Quantity
  // Product Quantity
  increase() {
    this.quantity++;
  }

  decrease() {
    if(this.quantity > 1){
      this.quantity--;
    }
  }
}
