import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  loginForm(data: {}): Observable<{}> {
    return this.http.post(environment.HOST + `/api/Auth`, data, {
      headers: { 'content-type': 'application/json' },
      responseType: 'json',
    });
  }
}
