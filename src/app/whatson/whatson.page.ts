import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
@Component({
  selector: 'app-whatson',
  templateUrl: './whatson.page.html',
  styleUrls: ['./whatson.page.scss'],
})
export class WhatsonPage implements OnInit {
  constructor() {}

  ngOnInit() {
    Browser.open({
      url: 'https://thestirlingarms.com.au/whats-on/stirling-specials',
    });
  }
}
