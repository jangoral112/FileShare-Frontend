import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeHeaderComponent } from './components/header/home-header/home-header.component';
import { DashboardHeaderComponent } from './components/header/dashboard-header/dashboard-header.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterHeaderComponent } from './components/header/register-header/register-header.component';
import { LoginComponent } from './components/login/login.component';
import { LoginHeaderComponent } from './components/header/login-header/login-header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HomeHeaderComponent,
    DashboardHeaderComponent,
    RegisterComponent,
    RegisterHeaderComponent,
    LoginComponent,
    LoginHeaderComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
