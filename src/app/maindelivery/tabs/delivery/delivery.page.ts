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
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from "src/app/services/product.service";
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
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

  productCategories: ProductCategory[];
  products: Product[] = [];
  currentCategoryId!: number;

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

  public segment = 'salad';
  public arr = new Array(4);

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.listProductCategories();
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        this.productCategories = data.data[0].menueGroup;
        this.currentCategoryId = data.data[0].menueGroup.menuGroupId;
        // console.log(this.productCategories,"API DATA");
      }
    )
    
  }

  listProducts() {

    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 326;
    }

    // now get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
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

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
}
