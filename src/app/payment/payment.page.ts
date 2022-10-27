import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  presentAlert(){
    var id=document.getElementById('modal')
    id.style.display='flex';
  }
}
