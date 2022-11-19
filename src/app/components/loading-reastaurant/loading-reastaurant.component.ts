import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-reastaurant',
  templateUrl: './loading-reastaurant.component.html',
  styleUrls: ['./loading-reastaurant.component.scss'],
})
export class LoadingReastaurantComponent implements OnInit {
  dummy = Array(10);
  constructor() {}

  ngOnInit() {}
}
