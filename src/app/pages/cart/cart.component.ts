import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [{
      product: 'https://via.placeholder.com/150',
      name: 'sneakers',
      price: 150,
      quantity: 1,
      id: 1
    },
    {
      product: 'https://via.placeholder.com/150',
      name: 'socks',
      price: 150,
      quantity: 1,
      id: 2
    }]
  };

  constructor(private cartService: CartService, private httpClient: HttpClient) { }

  displayedColumns: Array<string> = ['product', 'name', 'price', 'quantity', 'total', 'action'];

  dataSource: Array<CartItem> = [];

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  };

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void { 
    this.cartService.removeQuantity(item);
  }

  onCheckout(): void {
    this.httpClient.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async(res: any) => {
      let stripe = await loadStripe('pk_test_51MZZ4mEt6vmgKmbX9e1dSi4iQA3A7hQNWwLfpSdVFxwDKmlBP5xLMYox6qSLxu9ksk1kZ1uhzV8aJAw3K0HPpG6U00dCMpZi3l');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    });
  }

}
