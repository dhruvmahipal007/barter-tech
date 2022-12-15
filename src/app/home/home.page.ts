import { Component } from '@angular/core';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  device_model: any;
  device_platform: any;
  device_uuid: any;
  device_version: any;
  device_manufacturer: any;
  device_serial: any;
  registration_id: any;
  constructor() {}

  getDeviceInfo() {
    Device.getInfo().then((val: any) => {
      this.device_model = val.model;
      this.device_platform = val.platform;
      this.device_uuid = val.uuid;
      this.device_version = val.appVersion;
      this.device_manufacturer = val.manufacturer;
    });
  }
}
