import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
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
currentRoute:any;
presentDay:any;
workingHoursData: any[] = []
hours:any;
todaydate:any;
datePipe = new DatePipe('en-US');


  constructor(  private modalController: ModalController,  private fb: FormBuilder,  private alertController: AlertController,private authService: AuthService,) { 
    this.confirmationForm = this.fb.group({
      selectedPeople: [null],
      selectedDate: [null, [Validators.required]],
      selectedTime: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    //console.log(this.getWorkingHours());
     this.currentRoute=localStorage.getItem('currentRoute');
     this.value=this.currentRoute;
     this.isFormVisible=true;
     console.log(this.currentRoute);
     this.preOrderobject=JSON.parse(localStorage.getItem('preorder'));
     console.log(this.preOrderobject);
     if(this.preOrderobject){
      this.isFormVisible=true;
      this.confirmationForm.controls['selectedDate'].patchValue(this.preOrderobject.selectedDate);
      this.confirmationForm.controls['selectedTime'].patchValue(this.preOrderobject.selectedTime);
      this.todaydate = this.preOrderobject.selectedDate
      this.confirmationForm.controls['selectedPeople'].patchValue(this.preOrderobject.selectedPeople);
      this.value= this.preOrderobject.type
      if(this.value=='dinein'){
        this.dinein=true;
      }
}
if(this.value=='dinein'){
  this.dinein=true;
}
     }
     getWorkingHours(){
      this.authService.getworkingHours().subscribe((res:any)=>{
        console.log(res.data);
        this.workingHoursData = res.data
      })
     }

    
  async crossButton(){
    const onClosedData: string = 'Wrapped Up!';
    await this.modalController.dismiss();

  }
  async preorder(data){
   
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
    if(this.currentRoute!=this.value){
      const alert = await this.alertController.create({
        header: 'Alert',
        
        message: 'Are you sure you want to proceed as items present in the cart will be removed',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.alertController.dismiss();
            },
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {
              this.currentRoute=this.value;
              localStorage.setItem('currentRoute',this.value);
              localStorage.setItem('cartItems', JSON.stringify([]));
              this.authService.badgeDataSubject.next(0);
              localStorage.setItem('preorder',JSON.stringify(obj));
              this.modalController.dismiss(this.currentRoute);

            },
          },
        ],
      });
  
      await alert.present();
    }
    else{
      localStorage.setItem('preorder',JSON.stringify(obj));
      this.modalController.dismiss();
    }
  }

  async checkPastTiming(event){
   let selectedTime = event.detail.value;
   let currentTime = moment().format("HH:mm").split(':');
   selectedTime=selectedTime.split(':');
  //  console.log(selectedTime);
  //  console.log(currentTime);

   var d1=new Date(parseInt("2001",10),(parseInt("01",10))-1,parseInt("01",10),parseInt(selectedTime[0],10),parseInt(selectedTime[1],10));
var d2=new Date(parseInt("2001",10),(parseInt("01",10))-1,parseInt("01",10),parseInt(currentTime[0],10),parseInt(currentTime[1],10));
var dd1=d1.valueOf();
var dd2=d2.valueOf();
if(dd1<dd2){
  const alert = await this.alertController.create({
    header: 'Alert',
    message: 'Pre-Order Time Should Be A Future Time',

    buttons: ['OK'],
  });
  this.confirmationForm.controls['selectedTime'].patchValue(moment().add(15,'minutes').format("HH:mm"));
  // this.todaydate=this.datePipe.transform(new Date() , 'yyyy-MM-dd')
  // this.alertController.dismiss();
  await alert.present();
}


  //  let bol = moment(currentTime).isBefore(selectedTime)
  //  console.log(bol);
  //  console.log(currentTime);
  //  if(selectedTime[0] > currentTime[0] && selectedTime[1] > currentTime[1]){
  //   return false;
  //  }
  //  else{
  //   return true;
  //  }

  }


async onTimeChange(event){
  this.checkPastTiming(event)
  console.log(event.detail.value);
  console.log(this.confirmationForm.value);
  if(this.confirmationForm.controls['selectedTime'].value != null && this.confirmationForm.controls['selectedTime'].value != undefined){
  let selectedDate=new Date(this.confirmationForm.controls['selectedDate'].value);  
  var weekdays = new Array(7);
        weekdays[0] = "Sunday";
        weekdays[1] = "Monday";
        weekdays[2] = "Tuesday";
        weekdays[3] = "Wednesday";
        weekdays[4] = "Thursday";
        weekdays[5] = "Friday";
        weekdays[6] = "Saturday";
        this.presentDay  = weekdays[selectedDate.getDay()];
        console.log(this.presentDay);
    let time=event.detail.value;
    
      this.hours=Number(time.split(':')[0]);
    let minutes=time.split(':')[1];
    console.log(this.hours,minutes)
    let timing = this.checkValidity(this.workingHoursData,this.presentDay);
    let openingHrs = timing.OpeningHrs.split(':');
    let closingHrs = timing.ClosingHrs.split(':');
    if(openingHrs[1].includes('PM')){
      openingHrs[0] += 12
    }

    if(closingHrs[1].includes('PM')){
      closingHrs[0] =Number(closingHrs[0]) + 12
      closingHrs[1] = closingHrs[1].replace("PM","").trim();
      closingHrs[1] = Number(closingHrs[1]);
    }
    if(Number(openingHrs[0]) > this.hours || (this.hours>= Number(closingHrs[0])  && minutes>= closingHrs[1]) ){
      const alert = await this.alertController.create({
    header: this.currentRoute + ' not available!',
    
    message: this.currentRoute + ' service is not available during this time. Please choose another time',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          alert.dismiss();
        },
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          alert.dismiss();
        },
      },
    ],
  });

  await alert.present();
    }
  }
}
commonMethods(matchedData,day){
  let timing : any;
  matchedData.map(x=>{
    if(x.day==day){
      console.log(x.timing);
       timing = x.timing
    }
  })
  return timing;
}

checkValidity(data,day){
  let keys = Object.keys(data);
  let timing : any;
  keys.map((o,i) =>{
    if(this.currentRoute == o.toLowerCase()){
      timing = this.commonMethods(data[o],day);
    }
    else if( this.currentRoute== 'dinein' && o.toLowerCase()=='business'){
      timing = this.commonMethods(data[o],day);
    }
  })
  return timing[0];

}

async datetriggered(event)
{
  console.log(event);
  let i = 0;
  let currentdate=moment();
  currentdate.set('hour', 0);
  currentdate.set('minute', 0);
  currentdate.set('second', 0);
  let selectedDate=moment(event);
  selectedDate.add(1,'days')
  selectedDate.set('hour', 0);
  selectedDate.set('minute', 0);
  selectedDate.set('second', 0);
  console.log(currentdate);
  console.log(selectedDate);
  // let todaydate= this.datePipe.transform(new Date() , 'yyyy-MM-dd')
  if(currentdate>selectedDate){
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Pre-Order Date Should Be A Future Date Or Today',

      buttons: ['OK'],
    });
    this.todaydate=this.datePipe.transform(new Date() , 'yyyy-MM-dd')
    this.alertController.dismiss();
    await alert.present();
  
  }
  // console.log(moment(event));
  // if(todaydate != event){
  //   let splitDate = todaydate.split('-');
  //   let eventSpritDate = event.split('-');
  //   if(Number(eventSpritDate[0]) < Number(splitDate[0])){
  //     console.log("Wrong year")
  //   }
  //   if(Number(eventSpritDate[1]) < Number(splitDate[1])){
  //     console.log("Wrong month")
  //   }
  //   if(Number(eventSpritDate[2]) < Number(splitDate[2])){
  //     console.log("Wrong date")
  //   }

  // }
  // console.log(todaydate.split('-'),"------")
  // console.log(event.split('-'));
}


}
