import { RestaurantService } from '../_services/restaurant.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/bs-datepicker.config';
import { User } from '../user';
import { Router } from '@angular/router';
import { Restaurant } from '../Restaurant';


@Component({
  selector: 'app-restaurantnew',
  templateUrl: './restaurantnew.component.html',
  styleUrls: ['./restaurantnew.component.css']
})
export class RestaurantnewComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  resto: Restaurant;
  user: User;
  restoForm: FormGroup;
  userid: number;

  constructor(private authService: AuthService,
    private router: Router,
    private restoService: RestaurantService,
    private alertify: AlertifyService,
    private fb: FormBuilder) { }

  ngOnInit() {

     this.userid = this.authService.decodedToken.nameid;
    this.createRestoForm();
   // this.restoForm.userid =  this.authService.decodedToken.user_id;

  }

  createRestoForm() {
    this.restoForm = this.fb.group({
      userid: [this.userid, Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      contactinfo: ['', Validators.required],
      openhours: ['', Validators.required],
      cuisine: ['', Validators.required],
      typeOfRestaurant: ['', Validators.required],
      averagecost:  ['', Validators.required],
      description: ['', Validators.required],
      otherInfo: ['', Validators.required],
      isverified: [false, Validators.required],
      urlphoto: ['http://placehold.it/500x300', Validators.required]
    });
  }

/*
  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }
*/

  save() {
    /*if (this.restoForm.valid) { */

      this.resto = Object.assign({}, this.restoForm.value);

      this.restoService.save(this.resto).subscribe(() => {
        this.alertify.success('Registration successful');
        this.router.navigate(['/restos']);
      }, error => {

        this.alertify.error('Registration faild');
      });

   /* }*/
  }

  delete(sentid: number) {
    this.restoService.delete(sentid).subscribe(
      res => {this.resto = res; });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
