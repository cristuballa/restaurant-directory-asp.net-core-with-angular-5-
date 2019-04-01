import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { HttpClient, HttpParams,  HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { User } from '../user';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class AuthService {

  baseUrl = 'http://localhost:5000/api/auth/';
  userToken: any;
  decodedToken: any;
  currentuser: any;
  jwtHelper: JwtHelper = new JwtHelper();


  constructor(private http: Http, private httpc: HttpClient) {

  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model, this.requestOptions()).map((response: Response) => {
        const user = response.json();
        if (user && user.tokenString) {
            localStorage.setItem('token', user.tokenString);
            this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
            console.log(this.decodedToken);
        }
    }).catch(this.handleError);
  }

/*
 getuser(userId: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'user/' + userId, {responseType: 'json'} );
  }

  getUser() {
    return this.http.get('user/' + this.decodedToken.nameid );
}
*/

  loggedIn() {
    return tokenNotExpired('token');
  }

  register(model: any) {
      console.log(model);
    return this.http.post(this.baseUrl + 'register', model, this.requestOptions()).catch(this.handleError);
  }


logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
}


  private requestOptions() {
    const headers = new Headers({ 'Content-type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }


  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return Observable.throw(applicationError);
    }
    const serverError = error.json();
    let modelStateErrors = '';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }
    return Observable.throw(
      modelStateErrors || 'Server error'
    );
  }


  /*register1(user: User): Observable<User> {
    console.log(user);
    return this.httpc.post<User>(this.baseUrl + 'register', user, httpOptions).pipe(
      tap((user1: User) => console.log(`Added resto`)),
      catchError(this.handleError<User>('registerUser'))
    );
}
*/


}
