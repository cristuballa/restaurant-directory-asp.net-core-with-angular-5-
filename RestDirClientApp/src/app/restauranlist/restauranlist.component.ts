import { UserService } from './../_services/UserService.service';
import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../_services/restaurant.service';
import { Restaurant } from '../Restaurant';
import {FormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../_services/AlertService.service';
import { AuthService } from '../_services/auth.service';
import { User } from '../user';
import { AlertifyService } from '../_services/alertify.service';


@Component({
  selector: 'app-restauranlist',
  templateUrl: './restauranlist.component.html',
  styleUrls: ['./restauranlist.component.css']
})
export class RestauranlistComponent implements OnInit {

 public restos: Restaurant[];
 public resto: Restaurant;
 public user: User;
 public isadmin: boolean;

  constructor(private restoService: RestaurantService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private alertify: AlertifyService,
    private authService: AuthService
    ) { }

  ngOnInit() {
   this.gets();
   this.isAdmin();

  }


  gets() {
    this.restoService.gets().subscribe(
      data => {this.restos = data; console.log(data); },
      error => { this.alertService.error(error); }
    );
  }

  getsunverified() {
    this.restoService.getsunverified().subscribe(
      data => {this.restos = data; console.log(data); },
      error => {
        console.log(error);
        this.alertService.error(error);
      }
    );
  }

  search(keyword: string) {
    this.restoService.search(keyword).subscribe(
      data => {this.restos = data; console.log(data); });
  }

  get() {
    this.restoService.gets ().subscribe(
      data => {this.restos = data; console.log(data); });
  }

  update(restoId: number): void {
    this.restoService.verify(restoId)
    .subscribe(() => console.log('Resto save'));
  }

  verify(restoId: number): void {
    this.restoService.verify(restoId)
    .subscribe(() => {
      console.log('Resto verify');
     // this.getsunverified();
      this.alertify.success('Successfully verified');

    } );
  }

  delete(restoId: number): void {

    if (window.confirm('Are sure you want to delete this resto ?')) {
          this.restos = this.restos.filter(resto => resto.id === restoId);
          this.restoService.delete(restoId).subscribe(() => {
            this.alertService.success('Delete successful');
            this.gets();
          }, error => {
            this.alertService.error('Unable to delete.');
          }
        );
      }
  }

  verified(resto): void {
      console.log(resto);
      this.restoService.update(resto).subscribe(() => {
      console.log('Verifed!!');
      this.alertService.success('Verified.');
    }, error => {
      this.alertService.error('Unauthorized.');
    }
    );
  }

  isAdmin() {
    if (this.authService.decodedToken.role === 'Admin') {
       this.isadmin = true;
    } else {
      this.isadmin = false;
    }
  }
    sendMeResto(id: number) {
      console.log(id);
    this.router.navigate(['resto/' + id ]);

  }

  sendMeRestoAdd(id: number) {
    console.log(id);
    this.router.navigate(['addrestaurant/' + id ]);

}

}
