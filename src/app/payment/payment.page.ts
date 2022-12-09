import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.totalDataSubject.subscribe((res) => {
      console.log(res);
    });
  }
  presentAlert() {
    var id = document.getElementById('modal');
    id.style.display = 'flex';
  }
}
