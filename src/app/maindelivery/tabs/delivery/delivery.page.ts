import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
})
export class DeliveryPage implements OnInit {
  public slideOps = {
    loop: true,
    effect: 'slide',
    freeMode: true,
    freeModeSticky: false,
    slidesPerView: 3,
    spaceBetween: 1,
    autoplay: true,
    speed: 400,
    pager: true,
    initialSlide: 0,
    nested: true,
  };

  public segment = 'salad';
  public arr = new Array(4);

  constructor() {}

  ngOnInit() {}

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
}
