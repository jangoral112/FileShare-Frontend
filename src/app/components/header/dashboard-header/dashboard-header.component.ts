import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SessionStorageService} from '../../../services/session-storage.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private sessionStorageService: SessionStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      phrase: [null]
    })

    this.router.routeReuseStrategy.shouldReuseRoute = () => { return false; }
  }

  logOut() {
    this.sessionStorageService.clearSession();
    this.router.navigate([{outlets: {primary: 'home' , header: 'home'}}]);
  }

  navigateToUserProfile() {
    this.router.navigate(["/user", this.sessionStorageService.getEmail()]);
  }

  onSearch() {
    this.router.navigate(["user-search-result"], {queryParams: {phrase: this.phrase.value}});

  }

  public isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get phrase() {
    return this.searchForm.get('phrase');
  }
}
