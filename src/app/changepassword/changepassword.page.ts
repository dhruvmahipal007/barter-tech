import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  newPasswordVisible = false;
  confirmPasswordVisible = false;
  constructor() {}

  ngOnInit() {}
}
