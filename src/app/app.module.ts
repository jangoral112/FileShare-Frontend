import { NgModule } from '@angular/core';
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeHeaderComponent } from './components/header/home-header/home-header.component';
import { DashboardHeaderComponent } from './components/header/dashboard-header/dashboard-header.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FilesDashboardComponent } from './components/files/files-dashboard/files-dashboard.component';
import { FileTableComponent } from './components/files/file-table/file-table.component';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import { FileUploadComponent } from './components/files/file-upload/file-upload.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FileDetailsComponent } from './components/files/file-details/file-details.component';
import { FileSizePipe } from './utils/file-size.pipe';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HomeHeaderComponent,
    DashboardHeaderComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    FilesDashboardComponent,
    FileTableComponent,
    FileUploadComponent,
    FileDetailsComponent,
    FileSizePipe,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
