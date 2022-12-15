import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-preorder',
  templateUrl: './preorder.page.html',
  styleUrls: ['./preorder.page.scss'],
})
export class PreorderPage implements OnInit {
takeaway:boolean=false;
dinein:boolean=false;
delivery:boolean=false;
takeawayForm: FormGroup;
DeliveryForm:FormGroup;
DineinForm:FormGroup;

  constructor(  private modalController: ModalController,  private fb: FormBuilder,  private alertController: AlertController) { 
    this.takeawayForm = this.fb.group({
      selectedDate: [null, [Validators.required]],
      selectedTime: [null, [Validators.required]],
    });
    this.DeliveryForm = this.fb.group({
      postalCode: [null, [Validators.required]],
      selectedDate: [null, [Validators.required]],
      selectedTime: [null, [Validators.required]],
    });
    this.DineinForm = this.fb.group({
      selectedPeople: [null, [Validators.required]],
      selectedDate: [null, [Validators.required]],
      selectedTime: [null, [Validators.required]],
    });
  }

  ngOnInit() {
  }
  async crossButton(){
    const onClosedData: string = 'Wrapped Up!';
    await this.modalController.dismiss(onClosedData);
  }
  preorder(data){
    if(data=='takeaway'){
      this.takeaway=true;
      this.delivery=false;
      this.dinein=false;
    }
    if(data=='delivery'){
      this.delivery=true;
      this.takeaway=false;
      this.dinein=false;
    }
    if(data=='dinein'){
      this.delivery=false;
      this.takeaway=false;
      this.dinein=true;
    }
console.log(data);
  }
  submitTakeawayForm(){


  }
  submitDeliveryForm(){

  }
  submitDineInForm(){

  }

  async onTimeChange(event){
    console.log(event.detail.value);
    let time=event.detail.value;
    
    let hours=time.split(':')[0]
    let minutes=time.split(':')[1];
    
   if( hours< '11' || (hours>='21' && minutes>'30') ){
    const alert = await this.alertController.create({
      header: 'Alert',
     
      message: 'Order Time Should Fall Under Servicable Time And Should Be Future Time',
      buttons: ['OK'],
    });

    await alert.present();
  }
}

  get selectedDate_FormControl(): FormControl | null {
    return (this.takeawayForm?.get('selectedDate') as FormControl) ?? null;
  }
  get selectedTime_FormControl(): FormControl | null {
    return (this.takeawayForm?.get('selectedTime') as FormControl) ?? null;
  }
  get postalCode_FormControl(): FormControl | null {
    return (this.DeliveryForm?.get('postalCode') as FormControl) ?? null;
  }
  get deliverySelectedDate_FormControl(): FormControl | null {
    return (this.DeliveryForm?.get('selectedDate') as FormControl) ?? null;
  }
  get deliverySelectedTime_FormControl(): FormControl | null {
    return (this.DeliveryForm?.get('selectedTime') as FormControl) ?? null;
  }
  get dineInSelectedPeople_FormControl(): FormControl | null {
    return (this.DineinForm?.get('selectedPeople') as FormControl) ?? null;
  }
  get dineInSelectedTime_FormControl(): FormControl | null {
    return (this.DineinForm?.get('selectedDate') as FormControl) ?? null;
  }
  get dineInSelectedDate_FormControl(): FormControl | null {
    return (this.DineinForm?.get('selectedTime') as FormControl) ?? null;
  }




}
