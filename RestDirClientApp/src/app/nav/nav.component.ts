import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../Restaurant';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  resto1: Restaurant;
  model: any = {};

  constructor(private authService: AuthService,
     private route: ActivatedRoute,
     private router: Router,
     private restoService: RestaurantService) { }

  ngOnInit() {
  }
/*
  get(id: number) {
    this.restoService.get(resto).subscribe(
      data => {this.resto1 = data; console.log(data); });
  }
*/

  login() {
    this.authService.login(this.model).subscribe(data => {
      console.log('Logged in successfully');
    }, error => {
      console.log('Failed to login');
    });
  }

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    console.log('Logged out');
    this.router.navigate(['']);
  }


  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  sendMelogin() {
    this.router.navigate(['login']);
  }
  sendMelogin1() {
    this.router.navigate(['login1']);
  }

  sendMeHome() {
    this.router.navigate(['']);
  }

  sendMeRegister() {
    this.router.navigate(['register']);
  }

  sendMeRestos() {
    this.router.navigate(['restos']);
  }

  sendMeResto() {
    this.router.navigate(['resto']);
  }

  sendMeAddResto() {
    this.router.navigate(['addrestaurantnew']);
  }

}
