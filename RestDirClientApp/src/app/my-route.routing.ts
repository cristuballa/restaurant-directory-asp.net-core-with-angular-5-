import { RestauranlistComponent } from './restauranlist/restauranlist.component';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';

import { Login1Component } from './login1/login1.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/AuthGuard.service';
import { RestaurantdetailComponent } from './restaurantdetail/restaurantdetail.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantnewComponent } from './restaurantnew/restaurantnew.component';

const appRoutes: Routes = [
    { path: '', component: MainpageComponent },
    { path: 'login', component: Login1Component },
    { path: 'register', component: RegisterComponent },
    { path: 'restos', component: RestauranlistComponent },
    { path: 'resto/:id', component: RestaurantdetailComponent },
    { path: 'login1', component: LoginComponent },
    { path: 'addrestaurant', component: RestaurantComponent },
    { path: 'addrestaurant/:id', component: RestaurantComponent },
    { path: 'addrestaurantnew', component: RestaurantnewComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
    /*{ path: '', component: MainpageComponent, canActivate: [AuthGuard] },*/
];

/*
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})*/

export const routing = RouterModule.forRoot(appRoutes);
