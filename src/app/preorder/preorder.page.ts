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
confirmationForm: FormGroup;
selectedTakeawayDate:any;
selectedTakeawayTime:any;
selectedDeliveryDate:any;
selectedDeliveryTime:any;
selectedDineInDate:any;
selectedDineInTime:any;
selectedDineInPeople:any;
preOrderobject:any;
value:any;
isFormVisible: boolean = false;

  constructor(  private modalController: ModalController,  private fb: FormBuilder,  private alertController: AlertController) { 
    this.confirmationForm = this.fb.group({
      selectedPeople: [null],
      selectedDate: [null, [Validators.required]],
      selectedTime: [null, [Validators.required]],
    });
  }

  ngOnInit() {

     this.preOrderobject=JSON.parse(localStorage.getItem('preorder'));
     console.log(this.preOrderobject);
     if(this.preOrderobject){
      this.isFormVisible=true;
      this.confirmationForm.controls['selectedDate'].patchValue(this.preOrderobject.selectedDate);
      this.confirmationForm.controls['selectedTime'].patchValue(this.preOrderobject.selectedTime);
      this.confirmationForm.controls['selectedPeople'].patchValue(this.preOrderobject.selectedPeople);
      this.value= this.preOrderobject.type
      if(this.value=='dinein'){
        this.dinein=true;
      }
}
     }

    
  async crossButton(){
    const onClosedData: string = 'Wrapped Up!';
    await this.modalController.dismiss(onClosedData);
  }
  preorder(data){
    if(this.value != data){
      this.confirmationForm.reset('');
    }
    this.isFormVisible = true
    if(data == 'dinein'){
      this.dinein = true;
      this.confirmationForm.get('selectedPeople').addValidators(Validators.required);
    }
    else{
      this.dinein = false;
      this.confirmationForm.get('selectedPeople').clearValidators();
    }
    console.log(data);
  }



 async onSubmit(){
    let obj={
      type: this.value,
      selectedDate:this.confirmationForm.controls['selectedDate'].value,
      selectedTime:this.confirmationForm.controls['selectedTime'].value,
      selectedPeople: this.confirmationForm.controls['selectedPeople'].value
    }
      localStorage.setItem('preorder',JSON.stringify(obj));
      await this.modalController.dismiss();
  }

//   async onTimeChange(event){
//     console.log(event.detail.value);
//     let time=event.detail.value;
    
//     let hours=time.split(':')[0]
//     let minutes=time.split(':')[1];
    
//    if( hours< '11' || (hours>='21' && minutes>'30') ){
//     const alert = await this.alertController.create({
//       header: 'Alert',
     
//       message: 'Order Time Should Fall Under Servicable Time And Should Be Future Time',
//       buttons: ['OK'],
//     });

//     await alert.present();
//   }
// }




}
