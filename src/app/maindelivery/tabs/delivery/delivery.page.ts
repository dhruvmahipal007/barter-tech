import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
})
export class DeliveryPage implements OnInit {

  public slideOps = {
    pager : true,
    initialSlide: 0,
    speed : 400,
    spaceBetween: 100,
    nested: true,
    effect: 'flip',
    slidesPerView: 3
  };

  constructor() { }

  ngOnInit() {
  }

}
