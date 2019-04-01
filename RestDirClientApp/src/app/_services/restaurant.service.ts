
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Restaurant } from '../Restaurant';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Photo } from '../Photo';

const token = localStorage.getItem('token');

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
  Authorization: 'Bearer ' + token })
};


@Injectable()
export class RestaurantService {

   baseUrl = 'http://localhost:5000/api/restaurant/';
   baseUrl2 = 'http://localhost:5000/api/photo/';

  constructor(private http: HttpClient) {

   }

  private handleError1<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error, `Operation: ${operation}`);

      return of(result as T);
    };
  }

gets(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.baseUrl + 'restos', httpOptions).catch(this.handleError);
}

getPhotos(restoId: number): Observable<Photo[]> {
  return this.http.get<Photo[]>(this.baseUrl2 + 'photos/' + restoId, httpOptions).catch(this.handleError);
}

get(restoId: number): Observable<Restaurant> {
  return this.http.get<Restaurant>(this.baseUrl + 'resto/' + restoId, httpOptions).catch(this.handleError);
}

search(keyword: string): Observable<Restaurant[]> {
  return this.http.get<Restaurant[]>(this.baseUrl + 'search/' + keyword, httpOptions).catch(this.handleError);
}

getsunverified(): Observable<Restaurant[]> {
   console.log(httpOptions);
  return this.http.get<Restaurant[]>(this.baseUrl + 'unverifiedrestos', httpOptions).catch(this.handleError);
}


add(resto: Restaurant): Observable<Restaurant> {
        console.log(resto);
        return this.http.post<Restaurant>(this.baseUrl + 'Add', resto, httpOptions).pipe(
          tap((resto1: Restaurant) => console.log(`Added resto`)),
          catchError(this.handleError1<Restaurant>('addRestaurant'))
        );
    }

save(resto: Restaurant) {
      console.log(resto);
    return this.http.post(this.baseUrl + 'Add', resto, httpOptions).catch(this.handleError).catch(this.handleError);
  }


update(resto: Restaurant): Observable<Restaurant> {
      console.log('update');
      return this.http.put<Restaurant>(this.baseUrl + 'Update/' + resto.id, resto, httpOptions).catch(this.handleError);
    }

verify(restoId: number): Observable<Restaurant> {
    console.log(restoId);
      return this.http.put(this.baseUrl + 'verify/' + restoId,  httpOptions).catch(this.handleError);
    }

delete(restoId: number): Observable<Restaurant> {
  return this.http.delete<Restaurant>(this.baseUrl + 'Delete/' + restoId, httpOptions).pipe(
    tap(_ => console.log(`Deleted resto of id ${restoId}!`)),
    catchError(this.handleError1<Restaurant>('delete Resto'))
  );
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


}


