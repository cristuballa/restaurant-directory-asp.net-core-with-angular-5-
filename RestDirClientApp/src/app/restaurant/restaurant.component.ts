import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/UserService.service';
import { AlertService } from '../_services/AlertService.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { RestaurantService } from '../_services/restaurant.service';
import { Restaurant } from '../Restaurant';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})

export class RestaurantComponent implements OnInit {
  model: any = {};
  sentid: any;
  public resto: Restaurant;
  restoForm: FormGroup;

  constructor(private restoServices: RestaurantService,
    private auth: AuthService,
    private alertService: AlertifyService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {

    this.route.params.subscribe(res => {this.sentid = res.id; console.log(res.id); });
    this.createRestoForm();
    this.get();
    }

    ngOnInit() {

     }

     createRestoForm() {
      this.restoForm = this.fb.group({
        userid: ['', Validators.required],
        id: ['', Validators.required],
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
        urlphoto: ['', Validators.required]

      });
    }


   public save() {
      this.restoServices.update(this.model).subscribe(() => {
      console.log(this.model);
      console.log('Restaurant Updated');
      this.alertService.success('Updated successful');
      this.router.navigate(['restos']);
    }, error => {
      console.log(error);
      this.alertService.error(error);
    });
  }

  update(): void {
    console.log(this.resto);
    this.resto = Object.assign({}, this.restoForm.value);
    this.restoServices.update(this.resto)
    .subscribe(() => { console.log('Resto Updated');
    this.alertService.success('Update successful');
    });
  }

  get() {
    this.restoServices.get(this.sentid).subscribe(
     res => {
        this.model = res;
        console.log(this.model);

        this.restoForm.setValue(
        {
        userid: this.model.userId,
        id: this.model.id,
        name: this.model.name,
        address: this.model.address,
        contactinfo: this.model.contactInfo,
        openhours: this.model.openHours,
        cuisine: this.model.cuisine,
        typeOfRestaurant: this.model.typeOfRestaurant,
        averagecost: this.model.averageCost,
        otherInfo: this.model.otherInfo,
        description: this.model.description,
        isverified: this.model.isVerified,
        urlphoto: this.model.urlPhoto
      }
    );

    });
  }


}
