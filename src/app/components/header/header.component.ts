import { CartService } from './../../services/cart.service';
import { CartItem } from './../../models/cart.model';
import { Component, Input } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input()
  get cart(): Cart {
    return this._cart;
  }

  constructor(private cartService: CartService) { }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items.map((item) => item.quantity).reduce((prev, current) => prev + current, 0);
  }

  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart() {
    this.cartService.clearCart();
  }


}
