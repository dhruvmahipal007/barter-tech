import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild('searchInput') sInput;
  searchItems: any[] = [];
  itemsFound: number;
  product_quantity = 1;
  model: any = {
    icon: 'search-outline',
    title: 'No Food Matching Record Found',
  };
  query: any;
  isLoading: boolean = false;
  constructor(
    private authService: AuthService,
    private global: GlobalService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.sInput.setFocus();
    }, 500);
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
          console.log(data);
          this.searchItems = data.data;
          this.global.hideLoader();
          this.itemsFound = this.searchItems.length;
          console.log(this.searchItems);
        },
        error: (err) => {},
      });
    } else {
      this.searchItems = [];
    }
  }
}
