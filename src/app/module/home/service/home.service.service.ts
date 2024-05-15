import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { envairoment } from '../../../../environments/envairoment';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  private apiUrl = envairoment.url;

  constructor(private http: HttpClient) { }

  getSomething(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}accounts/get-something/`);
  }
}
