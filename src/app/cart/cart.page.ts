import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  quantity: number = 1;
  constructor() {}

  ngOnInit() {}
  i = 1;
  plus() {
    this.i++;
    this.quantity = this.i;
  }
  minus() {
    if (this.i != 1) {
      this.i--;
      this.quantity = this.i;
    }
  }
}
