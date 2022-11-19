import { Component, OnInit } from '@angular/core';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  SwiperOptions,
} from 'swiper';
import { IonicSlides } from '@ionic/angular';
// install Swiper modules
SwiperCore.use([
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  IonicSlides,
]);

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
})
export class DeliveryPage implements OnInit {
  // public slideOps = {
  //   loop: true,
  //   effect: 'slide',
  //   freeMode: true,
  //   freeModeSticky: false,
  //   slidesPerView: 3,
  //   spaceBetween: 1,
  //   autoplay: true,
  //   speed: 400,
  //   pager: true,
  //   initialSlide: 0,
  //   nested: true,
  // };

  config: SwiperOptions = {
    // loop: true,
    // effect: 'slide',
    // freeMode: true,
    // slidesPerView: 3,
    // spaceBetween: 1,
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    // speed: 400,
    // initialSlide: 0,
    // nested: true,
    // centeredSlides: true,

    slidesPerView: 3,
    autoplay: {
      delay: 2500,
    },
    loop: true,
    speed: 400,
  };

  public segment = 'salad';
  public arr = new Array(4);

  constructor() {}

  ngOnInit() {}

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
}
