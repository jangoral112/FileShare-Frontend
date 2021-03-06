import { NgModule } from '@angular/core';
import { HomeComponent} from './components/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HomeHeaderComponent} from './components/header/home-header/home-header.component';
import {DashboardHeaderComponent} from './components/header/dashboard-header/dashboard-header.component';
import { AuthGuard } from './guards/auth-guard';
import {FilesDashboardComponent} from './components/files/files-dashboard/files-dashboard.component';
import {FileUploadComponent} from './components/files/file-upload/file-upload.component';
import {FileDetailsComponent} from './components/files/file-details/file-details.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {UserSearchResultComponent} from './components/user-search-result/user-search-result.component';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';

const routes: Routes = [
  { path: '', redirectTo: '/home(header:home)', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home', component: HomeHeaderComponent, outlet: 'header' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardHeaderComponent, outlet: 'header', canActivate: [AuthGuard] },
  { path: 'files-dashboard', component: FilesDashboardComponent, canActivate: [AuthGuard] },
  { path: 'file-upload', component: FileUploadComponent, canActivate: [AuthGuard] },
  { path: 'file-details/:key', component: FileDetailsComponent, canActivate: [AuthGuard] },
  { path: 'user/:email', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'user-search-result', component: UserSearchResultComponent, canActivate: [AuthGuard] },
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
