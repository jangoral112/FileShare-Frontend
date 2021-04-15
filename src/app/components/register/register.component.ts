import { Component, OnInit } from '@angular/core';
import { UserRegistrationForm } from '../../models/form/UserRegistrationForm';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MustMatch} from '../validators/must-match';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted: boolean;

  // userRegistrationForm = new UserRegistrationForm();

  userRegistrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userRegistrationForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      passwordConfirm: [null, [Validators.required]]
    }, {
      // updateOn: 'submit',
      validators: MustMatch('password', 'passwordConfirm')
    });
    this.submitted = false;
  }

  validatePasswordInputs(password: string, passwordConfirmation: string): boolean {
    return password === passwordConfirmation;
  }

  // tslint:disable-next-line:typedef
  get username() {
    return this.userRegistrationForm.get('username');
  }

  // tslint:disable-next-line:typedef
  get email() {
    return this.userRegistrationForm.get('email');
  }

  // tslint:disable-next-line:typedef
  get password() {
    return this.userRegistrationForm.get('password');
  }

  // tslint:disable-next-line:typedef
  get passwordConfirm() {
    return this.userRegistrationForm.get('passwordConfirm');
  }

  onSubmit() {
    // console.log(this.userRegistrationForm);
    this.submitted = true;
  }
}
