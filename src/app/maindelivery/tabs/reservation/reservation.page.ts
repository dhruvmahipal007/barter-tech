import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
  reservationForm: FormGroup;
  zipped: boolean = true;
  dining_event_date = 'DINING DATE';
  dining_event_time = 'DINING TIME';
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router
  ) {
    this.reservationForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      email: [null, [Validators.required]],
      date: [null, [Validators.required]],
      time: [null, [Validators.required]],
      guests: [null, [Validators.required]],
      occasion: [null, [Validators.required]],
      notes: [null, [Validators.required]],
    });
  }

  ngOnInit() {}
  reserveNow() {
    let data = {
      firstname: this.firstName_FormControl.value,
      last_name: this.lastName_FormControl.value,
      email: this.email_FormControl.value,
      mobile: this.mobile_FormControl.value,
      guest: this.guests_FormControl.value,
      occasion: this.occasion_FormControl.value,
      note: this.notes_FormControl.value,
      merchant_id: 4,
      reservation_type:
        this.dining_event_date === 'DINING DATE' ? 'dining' : 'event',
    };
    if (this.dining_event_date === 'DINING DATE') {
      (data['diningDate'] = this.date_FormControl.value),
        (data['diningTime'] = this.time_FormControl.value);
    } else {
      data['eventDate'] = this.date_FormControl.value;
      data['eventTime'] = this.time_FormControl.value;
    }
    console.log(data);
    this.authService.reservation(data).subscribe({
      next: (data) => {
        // console.log(data);
        if (data.status) {
          this.toastService.presentToast(data.message);
          this.reservationForm.reset();
        } else {
          this.toastService.presentToast('Error in User Details');
        }
      },
      error: (err) => {
        this.toastService.presentToast(err);
      },
    });
  }

  tableReservation() {
    this.zipped = true;
    this.dining_event_date = 'DINING DATE';
    this.dining_event_time = 'DINING TIME';
  }

  eventReservation() {
    this.zipped = false;
    this.dining_event_date = 'EVENT DATE';
    this.dining_event_time = 'EVENT TIME';
  }
  get firstName_FormControl(): FormControl | null {
    return (this.reservationForm?.get('firstName') as FormControl) ?? null;
  }
  get lastName_FormControl(): FormControl | null {
    return (this.reservationForm?.get('lastName') as FormControl) ?? null;
  }
  get email_FormControl(): FormControl | null {
    return (this.reservationForm?.get('email') as FormControl) ?? null;
  }
  get date_FormControl(): FormControl | null {
    return (this.reservationForm?.get('date') as FormControl) ?? null;
  }
  get mobile_FormControl(): FormControl | null {
    return (this.reservationForm?.get('mobile') as FormControl) ?? null;
  }
  get time_FormControl(): FormControl | null {
    return (this.reservationForm?.get('time') as FormControl) ?? null;
  }
  get guests_FormControl(): FormControl | null {
    return (this.reservationForm?.get('guests') as FormControl) ?? null;
  }
  get occasion_FormControl(): FormControl | null {
    return (this.reservationForm?.get('occasion') as FormControl) ?? null;
  }
  get notes_FormControl(): FormControl | null {
    return (this.reservationForm?.get('notes') as FormControl) ?? null;
  }
}
