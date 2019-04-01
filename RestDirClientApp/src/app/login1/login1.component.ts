import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  AuthService } from '../_services/auth.service';
import { AlertService } from '../_services/AlertService.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.css']
})
export class Login1Component implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService,
        private alertify: AlertifyService) { }

    ngOnInit() {
        // reset login status
       // this.auth.logout();

        // get return url from route parameters or default to '/'
      //  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
  /*
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    */
   login() {
    this.authService.login(this.model).subscribe(data => {
      this.alertify.success('Logged in successfully');
      this.router.navigate(['restos']);
    }, error => {
        this.alertify.error('Failed to login');
    });
  }

  login1() {
    this.authService.login(this.model).subscribe(data => {
      this.alertify.success('logged in successfully');
    }, error => {
      this.alertify.error('Failed to log in');
    }, () => {
      this.router.navigate(['/members']);
    });
  }


  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.alertify.success ('Logged out');
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }


}
