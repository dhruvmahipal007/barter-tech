import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { GlobalService } from 'src/app/services/global.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild('searchInput') sInput;
  cartItemsLength:any=0;
  searchItems: any[] = [];
  itemsFound: number;
  product_quantity = 0;
  model: any = {
    icon: 'search-outline',
    title: 'No Food Matching Record Found',
  };
  query: any;
  isLoading: boolean = false;
  routercurrent:any;

  selectedProducts: any[] = [];
  constructor(
    private authService: AuthService,
    private global: GlobalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.sInput.setFocus();
    }, 500);
    this.routercurrent=localStorage.getItem('currentRoute');
    this.route.params.subscribe((res) => {
      if (JSON.parse(localStorage.getItem('cartItems'))) {
        this.selectedProducts = JSON.parse(localStorage.getItem('cartItems'));
      }
    });
    this.authService.badgeDataSubject.subscribe(res=>{
      console.log(res,"heelo");
      console.log(Object.keys(res),"byee");
      if(res==0){
       
       let data=JSON.parse(localStorage.getItem('cartItems'));
       this.cartItemsLength=data?data.length:0
       
      }
      else{
       this.cartItemsLength=res;
      }
   
     })
  }

  async onSearchChange(event) {
    console.log(event.detail.value);
    this.query = event.detail.value;

    // let obj = {
    //   merchant_id: '4',
    //   keyword: this.query,
    // };
    if (this.query.length >= 3) {
      this.global.showLoader('Loading Data');
      this.authService.searchData(this.query).subscribe({
        next: (data: any) => {
          if(data.data==""){
            this.searchItems=[]
          }
          else{

            this.searchItems = data.data;
          }
          
          console.log(data);
          this.searchItems.map((x) => {
            x.buttonTitle = 'ADD'
            if(this.routercurrent == 'delivery' && x.isAvailableDelivery == 0){
              x.buttonTitle = 'NotAvailable'
            }
            else if(this.routercurrent == 'takeaway' && x.isAvailableTakeAway == 0){
              x.buttonTitle = 'NotAvailable'
            }
            else if(this.routercurrent == 'dinein' && x.isAvailableDinein == 0){
              x.buttonTitle = 'NotAvailable' 
            }

            x.product_quantity = 0;
            this.selectedProducts = JSON.parse(
              localStorage.getItem('cartItems')
            );
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
          this.global.hideLoader();
          this.itemsFound = this.searchItems.length;
          console.log(this.searchItems);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.searchItems = [];
    }
  }

  subQty(product, index) {
    product.product_quantity = product.product_quantity - 1;
    if (product.product_quantity == 0) {
      this.selectedProducts = this.selectedProducts.filter(
        (ele) => ele.menuItemId != product.menuItemId
      );
    }
    localStorage.setItem('cartItems', JSON.stringify(this.selectedProducts));
    this.authService.badgeDataSubject.next(this.selectedProducts.length)
  }

  addQty(product, index) {
    console.log(this.selectedProducts);
    product.product_quantity = product.product_quantity + 1;
    localStorage.setItem('cartItems', JSON.stringify(this.selectedProducts));
  }

  add(product) {
    product.product_quantity = product.product_quantity + 1;
    this.selectedProducts.push(product);
    this.authService.badgeDataSubject.next(this.selectedProducts.length)
    localStorage.setItem('cartItems', JSON.stringify(this.selectedProducts));
  }
}
