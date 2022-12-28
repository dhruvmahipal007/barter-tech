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
// import { $ } from 'protractor';
import * as $ from 'jquery';
import { element } from 'protractor';

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
  // eslint-disable-next-line @typescript-eslint/naming-convention
  product_quantity = 0;
  selectedProducts: any= [];
  currentRoute: any;
  list=[];
  list2=[];
  newSize: any;
  groupName: any;
  quantity = 1;
  category: any;
  item: [];
  newValue: any;
  newValue1: any;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  tempItem: any = { selectedItems: [], IsSizeApplicable: '0', IsoptionApplicable: '0', product_quantity:0, options:{ size: []}};
  tempArray: any=[];
  selectedSize: any;
  isCartValid = true;


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
    // effect: 'slide',const
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
  handlerMessage: string;
  singleProduct: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private global: GlobalService,
    private authService: AuthService
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
      // console.log('piyush', data);
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

  // eslint-disable-next-line @typescript-eslint/member-ordering

  subQty(product, index) {
    // console.log(product, 'products in subqty');
    let removeItems = [];
    let remainingItems = [];
    product.product_quantity = product.product_quantity - 1;
    let latestCartItems = JSON.parse(localStorage.getItem('cartItems'));
    latestCartItems.forEach(element => {
      if (element.menuItemId == product.menuItemId) {
        removeItems.push(element);
      } else {
        remainingItems.push(element);
      }
    });
    removeItems.pop();
    latestCartItems = removeItems.concat(remainingItems);
    localStorage.setItem('cartItems', JSON.stringify(latestCartItems));
    let productLength = 0;
    latestCartItems.forEach(element => {
      productLength += element.product_quantity;
    });
    this.authService.badgeDataSubject.next(productLength);
    console.log(latestCartItems,'-----latestCartItems');
  }

  addQty(product, index) {
    const tempTotalMenuItem = localStorage.getItem('cartItems');
    const totalMenuItem = JSON.parse(tempTotalMenuItem);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    totalMenuItem.map((element)=> {
      if (element.menuItemId === product.menuItemId) {
        element.product_quantity = element.product_quantity + 1;
      }
    });
    localStorage.removeItem('cartItems');
    localStorage.setItem('cartItems',JSON.stringify(totalMenuItem));
    return product.product_quantity = product.product_quantity + 1;
  }

  add(product) {
    product.product_quantity = product.product_quantity + 1;

    this.selectedProducts.push(product);
    console.log("selected prods",this.selectedProducts);
    this.authService.badgeDataSubject.next(this.selectedProducts.length);
    localStorage.setItem('cartItems', JSON.stringify(this.selectedProducts));
  }

  openpop(product, item?){
    // document.getElementById("newpop").onreset();
    this.tempItem = {};
    this.singleProduct=product;
    const pop = document.getElementById('popup');
    pop.style.display = 'block';
    this.newValue = product.optionGroups[0]?.optionItems;
    this.groupName = product.optionGroups[0]?.optionGroupName;
    this.newSize = product.size[0]?.size_deliveryPrice;
    this.newValue1 = product.optionGroups[1]?.optionItems;
    this.tempItem = item;
    this.tempArray = JSON.parse(localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : [];
    console.log('this.menuItems','-----this.menuItems',this.tempItem);
  }

  onItemSelect(event) {
    if (event?.selected === true) {
      this.selectedProducts.push(event);

    } else {
      const newArray = this.selectedProducts.filter((el)=>el?.selected !== event?.selected);
      this.selectedProducts = newArray;
    }
    if(this.tempItem.isOptionMandatory) {
      let a = this.newValue.find((el)=>el.selected === true);
      let b = this.newValue1.find((el)=>el.selected === true);
      console.log(this.selectedSize,'----this.selectedSize');

      if(a && b && this.selectedSize) {
        this.isCartValid = false;
      } else {
        this.isCartValid = true;
      }
    }
  }

  addToCart() {
      this.tempItem.product_quantity = 1;
      this.singleProduct.product_quantity = this.singleProduct.product_quantity + 1;
      console.log('add to cart',this.singleProduct);
      this.singleProduct.options = this.singleProduct.product;
      this.category = this.singleProduct.product;
      this.authService.badgeDataSubject.next(this.menuItems.length);
      // this.tempItem.selectedItems = this.selectedProducts;
      this.tempItem.options.size = [];
      this.tempItem.options.size.push(this.selectedSize);
      this.tempArray.push(this.tempItem);

      localStorage.setItem(
        'cartItems',
        JSON.stringify(this.tempArray)
      );
      const notShow = document.getElementById('popup');
      notShow.style.display = 'none';
      const currentCartItems = JSON.parse(localStorage.getItem('cartItems'));
      let productLength = 0;
      currentCartItems.forEach(element => {
        productLength += element.product_quantity;
      });
      this.authService.badgeDataSubject.next(productLength);
      this.menuItems.map((x) => {
        x.product_quantity = 0;
        this.tempArray = JSON.parse(localStorage.getItem('cartItems'));
        if (this.tempArray && this.tempArray.length > 0) {
          this.tempArray.map((y: any) => {
            if (x.menuItemId == y.menuItemId) {
              x.product_quantity = x.product_quantity + y.product_quantity;
            }
          });
        } else {
          this.tempArray = [];
        }
      });
      this.selectedProducts = [];

  }


  notShow(){
    const notShow = document.getElementById('popup');
    notShow.style.display = 'none';
  }

  getDataBymenuGroupId(id: any, name: any) {
    console.log('1111111')
    this.menuItems = this.productCategories.find(
      (x) => Number(x.menuGroupId) == Number(id)
    ).menuItems;
    this.menuItems.map((x) => {
      x.product_quantity = 0;
      this.tempArray = JSON.parse(localStorage.getItem('cartItems'));
      if (this.tempArray && this.tempArray.length > 0) {
        this.tempArray.map((y: any) => {
          if (x.menuItemId == y.menuItemId) {
            x.product_quantity = x.product_quantity + y.product_quantity;
          }
        });
      } else {
        this.tempArray = [];
      }
    });
    this.currentItem = id;
    this.selected = name;
    console.log('newValue', this.menuItems);
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
