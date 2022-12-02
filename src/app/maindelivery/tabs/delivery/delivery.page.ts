import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  SwiperOptions,
} from 'swiper';
import { IonicSlides, IonSegment, IonSlides } from '@ionic/angular';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

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
  @ViewChild('slides', { static: true }) slider: IonSlides;
  productCategories: ProductCategory[];
  products: Product[] = [];
  currentCategoryId!: number;
  menuItems: any[] = [];
  currentItem: any;
  selected: any;

  quantity: number = 1;
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
  segment = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private global: GlobalService
  ) {}

  ngOnInit() {
    this.listProductCategories();
  }

  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  listProductCategories() {
    this.global.showLoader('Loading Data');
    this.productService.getProductCategories().subscribe((data) => {
      this.productCategories = data.data[0].menueGroup;
      this.currentCategoryId = data.data[0].menueGroup[0].menuGroupId;
      this.selected = data.data[0].menueGroup[0].groupName;
      this.global.hideLoader();
      this.getDataBymenuGroupId(this.currentCategoryId, this.selected);
      // console.log(this.productCategories,"API DATA");
    });
  }

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

  getDataBymenuGroupId(id: any, name: any) {
    this.menuItems = this.productCategories.find(
      (x) => Number(x.menuGroupId) == Number(id)
    ).menuItems;
    this.currentItem = id;
    this.selected = name;
    console.log(this.menuItems);
  }
  isResetVisible() {
    if (this.productCategories?.length > 0) {
      if (
        Number(this.productCategories[0]?.menuGroupId) ==
        Number(this.currentItem)
      ) {
        return false;
      }
      return true;
    }
  }

  resetFunctionality() {
    this.menuItems = this.productCategories[0].menuItems;
    this.currentItem = this.productCategories[0].menuGroupId;
    this.selected = this.productCategories[0].groupName;
    this.productCategories = this.productCategories;
  }
}
