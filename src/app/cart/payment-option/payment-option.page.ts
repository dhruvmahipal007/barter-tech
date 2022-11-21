import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-option',
  templateUrl: './payment-option.page.html',
  styleUrls: ['./payment-option.page.scss'],
})
export class PaymentOptionPage implements OnInit {
  url: any;
  constructor(public router: Router) {}

  ngOnInit() {}
  presentAlert() {
    var id = document.getElementById('modal');
    id.style.display = 'flex';
  }
}
