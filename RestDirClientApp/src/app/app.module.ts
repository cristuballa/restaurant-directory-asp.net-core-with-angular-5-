import { AlertService } from './_services/AlertService.service';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './_directives/alert.component';
import { AuthGuard } from './_guards/AuthGuard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RestauranlistComponent } from './restauranlist/restauranlist.component';
import { RestaurantService } from './_services/restaurant.service';
import { AuthService } from './_services/auth.service';
import { NavComponent } from './nav/nav.component';
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule  } from './material.module';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './login/login.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { Login1Component } from './login1/login1.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './_services/UserService.service';
import { routing } from './my-route.routing';
import { MainpageComponent } from './mainpage/mainpage.component';
import { RestaurantdetailComponent } from './restaurantdetail/restaurantdetail.component';
import { AlertifyService } from './_services/alertify.service';
import { FooterComponent } from './footer/footer.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { RestaurantnewComponent } from './restaurantnew/restaurantnew.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    RestauranlistComponent,
    NavComponent,
    LoginComponent,
    Login1Component,
    RestaurantComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    MainpageComponent,
    RestaurantdetailComponent,
    FooterComponent,
    RestaurantnewComponent
],
  imports: [
    BrowserModule, HttpClientModule, FormsModule,
     BrowserAnimationsModule, MaterialModule, ReactiveFormsModule,
     HttpModule, routing, BsDropdownModule.forRoot(), FileUploadModule
  ],
  providers: [RestaurantService, AuthService, UserService, AuthGuard, AlertService, AlertifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
