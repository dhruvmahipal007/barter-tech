import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maindelivery',
  templateUrl: './maindelivery.page.html',
  styleUrls: ['./maindelivery.page.scss'],
})
export class MaindeliveryPage implements OnInit {
  public slideOps = {
    // pager : true,
    // initialSlide: 0,
    // speed : 400,
    // spaceBetween: 100,
    // nested: true,
    // effect: 'flip',
    // slidesPerView: 3,
    // autoplay:true,
    // loop:true

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

  isSelected = true;

  public segment = 'salad';
  public arr = new Array(4);

  constructor() {}

  ngOnInit() {}

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
}
