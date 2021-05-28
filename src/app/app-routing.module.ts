import { NgModule } from '@angular/core';
import { HomeComponent} from './components/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HomeHeaderComponent} from './components/header/home-header/home-header.component';
import {DashboardHeaderComponent} from './components/header/dashboard-header/dashboard-header.component';
import { AuthGuard } from './guards/auth-guard';
import {FilesDashboardComponent} from './components/files-dashboard/files-dashboard.component';
import {FileUploadComponent} from './components/file-upload/file-upload.component';
import {FileDetailsComponent} from './components/file-details/file-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home(header:home)', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home', component: HomeHeaderComponent, outlet: 'header' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardHeaderComponent, outlet: 'header', canActivate: [AuthGuard] },
  { path: 'file-dashboard', component: FilesDashboardComponent, canActivate: [AuthGuard] },
  { path: 'file-upload', component: FileUploadComponent, canActivate: [AuthGuard] },
  { path: 'file-details/:key', component: FileDetailsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
