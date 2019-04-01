import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { RestaurantService } from '../_services/restaurant.service';
import { Restaurant } from '../Restaurant';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Photo } from '../Photo';


@Component({
  selector: 'app-restaurantdetail',
  templateUrl: './restaurantdetail.component.html',
  styleUrls: ['./restaurantdetail.component.css']
})
export class RestaurantdetailComponent implements OnInit {

  public resto: Restaurant;
  public photos: Photo[];

  sentid: number;

  public baseUrl = 'http://localhost:5000/api/photo/';

  public uploader: FileUploader; /*= new FileUploader({url: URL + this.sentid});*/
  public hasBaseDropZoneOver: boolean;
  public hasAnotherDropZoneOver: boolean;


  constructor(private restoService: RestaurantService, private route: ActivatedRoute, private authService: AuthService ) {
    this.route.params.subscribe(res => {this.sentid = res.id; console.log(res.id); });
    this.get();
    this.getPhotos();
  }


 ngOnInit() {
  this.initializeUploader();
  }

  initializeUploader() {

    this.uploader = new FileUploader({
      url: this.baseUrl + 'Add/' + this.sentid + '/' + this.authService.decodedToken.nameid,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateadded: res.dateadded,
          ismain: res.ismain,
          publicid: res.publicid,
          userid: res.userid,
          restaurantid: res.restaurantid
        };
        this.photos.push(photo);
        this.get();

      }
    };
  }

  get() {
     this.restoService.get(this.sentid).subscribe(
     res => {this.resto = res; });
  }

  getPhotos() {
    this.restoService.getPhotos(this.sentid).subscribe(
      res => {this.photos = res; });
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }


}
