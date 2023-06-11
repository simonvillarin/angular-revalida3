import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
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
}
