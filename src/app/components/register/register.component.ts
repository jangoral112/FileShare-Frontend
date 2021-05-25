import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../../validators/must-match';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // In purpose of form error handling
  submitClicked: boolean;

  userRegistrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastr: ToastrService) { }

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
    this.submitClicked = false;
  }

  onSubmit() {
    if(this.userRegistrationForm.valid) {
      this.userService.registerUser(this.username.value, this.email.value, this.password.value)
        .subscribe(
          response => {
            this.toastr.success(response.message);
          },
          error => {
            this.toastr.error(error.error.message, error.status);
          });
    }
    this.submitClicked = true;
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
}
