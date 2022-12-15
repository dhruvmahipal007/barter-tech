import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  constructor(  private modalController: ModalController,  private fb: FormBuilder,) { 
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

  get selectedDate_FormControl(): FormControl | null {
    return (this.takeawayForm?.get('selectedDate') as FormControl) ?? null;
  }
}
