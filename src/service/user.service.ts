import { Injectable } from '@angular/core';
import { User } from 'src/model/user.model';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'https://centralerros-api.herokuapp.com/api';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    /*
        Creates a new User
    */
   createUser(user: User): Observable<User> {
    return this.http.post<User>(baseUrl + '/user', user)
        .pipe(
            tap((user: User) => 
            catchError(this.handleError<User>('createUser'))
        ));
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error);

            return of(result as T);
        };
    }
}