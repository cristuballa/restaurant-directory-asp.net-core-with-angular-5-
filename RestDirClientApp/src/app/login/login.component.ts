import { AuthService } from './../_services/auth.service';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../_services/AlertService.service';
import { AlertifyService } from '../_services/alertify.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private alertify: AlertifyService) { }

    public model: any = {};
  answer: any = '';
  answerDisplay: any = '';
  showSpinner: any = false;

  loading = false;
  returnUrl: string;


  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(data => {
      this.alertify.success('Logged in successfully');
      this.router.navigate(['restos']);
    }, error => {
        this.alertify.error('Failed to login');
    });
  }

/*
  login() {
    this.authService.login(this.model).subscribe(data => {
      console.log('Logged in successfully');
    }, error => {
      console.log('Failed to login');

    });
  }
*/

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    console.log('Logged out');
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  sendMeRegister() {
    this.router.navigate(['register']);
  }

}
