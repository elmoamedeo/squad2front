import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Log } from "../model/log.model";
import { Observable } from "rxjs/index";
import { ApiResponse } from "../model/api.response";

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:8080/users/';

  login(loginPayload) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>('http://localhost:8080/' + 'token/generate-token', loginPayload);
  }

  getLogs() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl);
  }

  getLogById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + id);
  }

  createLog(log: Log): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, log);
  }

  updateLog(log: Log): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + log.id, log);
  }

  deleteLog(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }

}