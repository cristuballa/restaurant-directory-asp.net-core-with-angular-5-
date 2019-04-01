
import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/UserService.service';
import { AlertService } from '../_services/AlertService.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
    public model: any = {};
    @Output() cancelRegister = new EventEmitter();

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertifyService,
        private auth: AuthService ) { }


   register() {
     if (this.model.password === this.model.cpassword) {
        this.auth.register(this.model).subscribe(() => {
          console.log('Registration successful');
          this.alertService.success('Registration successful');
          this.router.navigate(['login1']);
        }, error => {
          console.log(error);
          this.alertService.error(error);

        });
    } else {this.alertService.error('Password not match'); }

  }

 confirmPassword() {
   return this.model.password === this.model.cpassword  ? true : false;

 }

  cancel() {
    this.cancelRegister.emit(false);
  }


}
