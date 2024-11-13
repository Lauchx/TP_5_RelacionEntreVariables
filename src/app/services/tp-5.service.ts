import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TP5Service {
private url = "https://apidemo.geoeducacion.com.ar/api/testing/pearson/1"
  constructor(private http: HttpClient){ }

  get(): Observable<any> {
    return this.http.get(this.url)
  }


}
