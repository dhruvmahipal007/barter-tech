import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
  dining_event_date = 'DINING DATE';
  dining_event_time = 'DINING TIME';
  constructor() {}

  ngOnInit() {}

  tableReservation() {
    this.dining_event_date = 'DINING DATE';
    this.dining_event_time = 'DINING TIME';
  }

  eventReservation() {
    this.dining_event_date = 'EVENT DATE';
    this.dining_event_time = 'EVENT TIME';
  }
}
