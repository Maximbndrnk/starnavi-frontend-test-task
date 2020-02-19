import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://starnavi-frontend-test-task.herokuapp.com';

  constructor(private http: HttpClient) {
  }

  get(endPoint: string, options?: {}) {
    return this.http.get(`${this.baseUrl}/${endPoint}`, options);
  }

  post(endPoint: string, body: any, options?: {}) {
    return this.http.post(`${this.baseUrl}/${endPoint}`, body, options);
  }

}
