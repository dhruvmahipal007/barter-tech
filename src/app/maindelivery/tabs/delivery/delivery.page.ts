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
import { AuthService } from 'src/app/services/auth.service';
import { JsonpClientBackend } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

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
  product_quantity = 0;
  selectedProducts: any[] = [];
  currentRoute: any;
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
  dummyRoute: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private global: GlobalService,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    this.currentRoute = this.route.snapshot['_routerState'].url.split('/')[2];
    console.log(this.currentRoute, 'lkjhgfxz');
    let staticRoute = localStorage.getItem('currentRoute');
    if (staticRoute && staticRoute != this.currentRoute) {
      localStorage.setItem('cartItems', JSON.stringify([]));
      this.authService.badgeDataSubject.next(0);
    }
  }

  ngOnInit() {
    localStorage.setItem('currentRoute', this.currentRoute);
    this.route.params.subscribe((res) => {
      this.currentRoute = this.route.snapshot['_routerState'].url.split('/')[2];
      console.log(this.currentRoute, 'lkjhgfxz');
      let staticRoute = localStorage.getItem('currentRoute');
      if (staticRoute && staticRoute != this.currentRoute) {
        localStorage.setItem('cartItems', JSON.stringify([]));
        this.authService.badgeDataSubject.next(0);
      }
      this.listProductCategories();
      if (JSON.parse(localStorage.getItem('cartItems'))) {
        this.selectedProducts = JSON.parse(localStorage.getItem('cartItems'));
      }
    });
    // setTimeout(this.getTime(), 60000);
  }

  getTime() {
    // let getLocalStorageOrderTime = localStorage.getItem('latestOrder');
    console.log('1 minute over');
    return 'ok';
    // return JSON.parse(getLocalStorageOrderTime);
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

  // i = 1;
  // plus() {
  //   this.i++;
  //   this.quantity = this.i;
  // }
  // minus() {
  //   if (this.i != 1) {
  //     this.i--;
  //     this.quantity = this.i;
  //   }
  // }

  subQty(product, index) {
    product.product_quantity = product.product_quantity - 1;
    let ind = this.selectedProducts.findIndex(
      (x) => x.menuItemId == product.menuItemId
    );
    this.selectedProducts[ind] = product;
    if (product.product_quantity == 0) {
      this.selectedProducts = this.selectedProducts.filter(
        (ele) => ele.menuItemId != product.menuItemId
      );
    }
    localStorage.setItem('cartItems', JSON.stringify(this.selectedProducts));
    this.authService.badgeDataSubject.next(this.selectedProducts.length);
  }

  addQty(product, index) {
    console.log(this.selectedProducts);
    product.product_quantity = ++product.product_quantity;
    let ind = this.selectedProducts.findIndex(
      (x) => x.menuItemId == product.menuItemId
    );
    this.selectedProducts[ind] = product;
    localStorage.setItem('cartItems', JSON.stringify(this.selectedProducts));
  }

  async add(product) {
    let time = `${new Date().getHours()}-${new Date().getMinutes()} `;

    let hours = time.split('-')[0];
    let minutes = time.split('-')[1];
    if (hours < '11' || (hours >= '21' && minutes > '30')) {
      const alert = await this.alertController.create({
        header: 'Alert',

        message:
          'Order Time Should Fall Under Servicable Time And Should Be Future Time',
        buttons: ['OK'],
      });

      await alert.present();
    } else {
      product.product_quantity = product.product_quantity + 1;
      this.selectedProducts.push(product);
      this.authService.badgeDataSubject.next(this.selectedProducts.length);
      localStorage.setItem('cartItems', JSON.stringify(this.selectedProducts));
    }
  }

  getDataBymenuGroupId(id: any, name: any) {
    this.menuItems = this.productCategories.find(
      (x) => Number(x.menuGroupId) == Number(id)
    ).menuItems;
    this.menuItems.map((x) => {
      x.product_quantity = 0;
      this.selectedProducts = JSON.parse(localStorage.getItem('cartItems'));
      if (this.selectedProducts && this.selectedProducts.length > 0) {
        this.selectedProducts.map((y: any) => {
          if (x.menuItemId == y.menuItemId) {
            x.product_quantity = y.product_quantity;
          }
        });
      } else {
        this.selectedProducts = [];
      }
    });
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

  segmentChanged(e) {
    //<ion-segment (ionChange)="segmentChanged($event)">
    setTimeout(() => {
      const s = e.target.getBoundingClientRect();
      const sw = s.right - s.left;
      for (const button of e.target.childNodes) {
        if (button.className.indexOf('segment-button-checked') > -1) {
          const bc = button.offsetLeft + button.offsetWidth / 2;
          const diff = bc - sw / 2;
          e.target.scrollTo({
            left: diff,
            behavior: 'smooth',
          });
          break;
        }
      }
    }, 200);
  }
}
