import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild('searchInput') sInput;
  model: any = {
    icon: 'search-outline',
    title: 'No Food Matching Record Found',
  };
  query: any;
  isLoading: boolean = false;
  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.sInput.setFocus();
    }, 500);
  }

  async onSearchChange(event) {
    console.log(event.detail.value);
    this.query = event.detail.value;
    // this.restaurants=[];
    // if(this.query.length>0){
    // this.isLoading=true;
    // setTimeout(async()=>{
    //   this.restaurants=await this.allRestaurants.filter((element:any)=>{
    //     return element.short_name.includes(this.query);
    //   });
    // this.isLoading=false;
    // },3000);
    // }
  }
}
