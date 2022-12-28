import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-maindelivery',
  templateUrl: './maindelivery.page.html',
  styleUrls: ['./maindelivery.page.scss'],
})
export class MaindeliveryPage implements OnInit {

  cartItemsLength:any=0;
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

  constructor(private authservice:AuthService ) {

  }

  ngOnInit() {
    //this.cartItemsLength= !!localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem("cartItems")).length : 0
    this.authservice.badgeDataSubject.subscribe(res=>{
     console.log(res,"heelo");
    //  console.log(Object.keys(res),"byee");
     if(res == 0){
      let data=JSON.parse(localStorage.getItem('cartItems'));
      if (data) {
        let itemCount = 0;
       data.forEach(element => {
          itemCount = itemCount + element.product_quantity;
          return itemCount;
        });
        this.cartItemsLength = itemCount;
      } else {
        this.cartItemsLength = 0;
      }

     }
     else{
      this.cartItemsLength=res;
     }

    })


    // console.log(this.cartItemsLength,"length");
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

  updateMyDate($event) {
    // const day: number = $event.detail.value.day.value;
    // const month: number = $event.detail.value.month.value;
    // const year: number = $event.detail.value.year.value;
    console.log($event); // --> wil contains $event.day, $event.month and $event.year
  //   console.log(day);
  //   console.log(month);
  //   console.log(year);
  }

}
