import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SessionStorageService} from '../../../services/session-storage.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {

  constructor(private router: Router, private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
  }

  logOut() {
    this.sessionStorageService.clearSession();
    this.router.navigate([{outlets: {primary: 'home' , header: 'home'}}]);
  }
}
