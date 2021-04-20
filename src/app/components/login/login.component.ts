import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // In purpose of form error handling
  submitClicked: boolean;

  userLoginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userLoginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
    this.submitClicked = false;
  }

  get email() {
    return this.userLoginForm.get('email');
  }

  get password() {
    return this.userLoginForm.get('password');
  }

  onSubmit() {
    if(this.userLoginForm.valid) {
      this.authService.logInUser(this.email.value, this.password.value).subscribe(
        response => {
          this.toastr.success(response.body.message);
          this.router.navigate([{outlets: {primary: 'dashboard' , header: 'dashboard'}}]);
        },
          error => {
            this.toastr.error(error.error.message, error.status);
          }
      )
    }
    this.submitClicked = true;
  }

}
