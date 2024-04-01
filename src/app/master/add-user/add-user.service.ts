import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddUserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<any[]> {
    return this.http.get<any[]>(
      environment.HOST + `/api/OutsourcedUser/GetUserWithBiz`
    );
  }

  postRegisterationForm(data: {}): Observable<{}> {
    return this.http.post(environment.HOST + `/api/OutsourcedUser`, data, {
      headers: { 'content-type': 'application/json' },
      responseType: 'json',
    });
  }

  getBusinessList(): Observable<any[]> {
    return this.http.get<any[]>(environment.HOST + `/api/Business`);
  }

  updateRegisterationForm(id: number, data: {}): Observable<{}> {
    return this.http.put(environment.HOST + `/api/OutsourcedUser/${id}`, data, {
      headers: { 'content-type': 'application/json' },
      responseType: 'json',
    });
  }
}
