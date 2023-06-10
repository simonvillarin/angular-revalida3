import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart/cart.service';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
<<<<<<< HEAD
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
=======
  @Input() product: Product | undefined;

  constructor(private router: Router, private cartService: CartService) {}

  viewProduct = (id: number) => {
    this.router.navigate(['/product', id]);
  };

  addToCartItem = (product: Product) => {
    const userLocalStorage = localStorage.getItem('user');
    let userId;
    if (userLocalStorage) {
      const user = JSON.parse(userLocalStorage);
      userId = user.userId;
    }

    const payload = {
      userId: userId,
      productId: product.productId,
      productName: product.productName,
      category: product.category,
      description: product.description,
      quantity: 1,
      price: product.price,
      img: product.img,
    };

    this.cartService.addCartItem(payload).subscribe((res) => console.log(res));
  };
>>>>>>> 9739c4bd869d43fbd16d690bb3d3187ffd20b6dc
}
