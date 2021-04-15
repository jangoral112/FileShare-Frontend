import { Component, OnInit } from '@angular/core';
import {UserRegistrationForm} from '../../models/form/UserRegistrationForm';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;

  userRegistrationForm = new UserRegistrationForm();
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.userRegistrationForm);
    this.submitted = true;
  }
}
