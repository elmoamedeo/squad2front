import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Log } from 'src/model/log.model';
import { tap, catchError } from 'rxjs/operators';
  
const baseUrl = 'https://centralerros-api.herokuapp.com/api';

@Injectable()
export class LogService {

    constructor(private http: HttpClient) { }

    /* 
        Get all Logs 
    */
    getLogs(): Observable<Log[]> {
        return this.http.get<Log[]>(baseUrl + '/logs')
            .pipe(
                tap(logs => console.log('Returned all logs.')),
                catchError(this.handleError('getLogs', []))
            );
    }

    /*
        Get Log by Id 
    */
    getLogById(id: string): Observable<Log> {
        return this.http.get<Log>(baseUrl + '/logs/' + id)
            .pipe(
                tap(_ => console.log('Returned Log by Id')),
                catchError(this.handleError<Log>(`getLog by id=${id}`))
            );
    }

    /*
        Create a new Log
    */
    createLog(log: Log): Observable<Log> {
        return this.http.post<Log>(baseUrl + '/logs', log)
            .pipe(
                tap((log: Log) => console.log(`Created new Log with id=${log.id}`)),
                catchError(this.handleError<Log>('createLog'))
            );
    }

    /*
        Update Log
    */
    updateLog(id: string, log: Log): Observable<any> {
        return this.http.put<Log>(baseUrl + '/logs/' + id, log)
            .pipe(
                tap(_ => console.log(`Updated log with id = ${id}`)),
                catchError(this.handleError<any>('updateLog'))
            );
    }

    /*
        Delete Log
    */
    deleteLog(id: string): Observable<Log> {
        return this.http.delete<Log>(baseUrl + '/logs/' + id)
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