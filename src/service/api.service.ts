import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs/index";
import { catchError, tap } from 'rxjs/operators';
import { Log } from '../model/log.model';
import { User } from '../model/user.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  response: { observe: 'response' }
};

const baseUrl = 'https://localhost:44341/api';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  /* 
    Token Jwt / Login
  */
  login(loginPayload): Observable<User> {
    return this.http.post<User>(baseUrl + '/Login', loginPayload);
  }

  /* 
    Get all Logs 
  */
  getLogs(): Observable<Log[]> {
    return this.http.get<Log[]>(baseUrl)
      .pipe(
        tap(logs => console.log('Returned all logs.')),
        catchError(this.handleError('getLogs', []))
      );
  }

  /*
    Get Log by Id 
  */
  getLogById(id: number): Observable<Log> {
    return this.http.get<Log>(baseUrl + id)
      .pipe(
        tap(_ => console.log('Returned Log by Id')),
        catchError(this.handleError<Log>(`getLog by id=${id}`))
      );
  }

  /*
    Create a new Log
  */
  createLog(log: Log): Observable<Log> {
    return this.http.post<Log>(baseUrl, log, httpOptions)
      .pipe(
        tap((log: Log) => console.log(`Created new Log with id=${log._id}`)),
        catchError(this.handleError<Log>('createLog'))
      );
  }

  /*
    Update Log
  */
  updateLog(id: number, log): Observable<any> {
    return this.http.put<Log>(baseUrl + log._id, log, httpOptions)
      .pipe(
        tap(_ => console.log(`Updated log with id = ${id}`)),
        catchError(this.handleError<any>('updateLog'))
      );
  }

  /*
    Delete Log
  */
  deleteLog(id: number): Observable<Log> {
    return this.http.delete<Log>(baseUrl + id, httpOptions)
      .pipe(
        tap(_ => console.log(`Deleted Log with id = ${id}`)),
        catchError(this.handleError<Log>('deleteLog'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }

}