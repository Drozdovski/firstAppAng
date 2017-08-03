import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class Todo {
  constructor(public http: Http) {}

  query(params?) {
    return this.http.get(`${environment.api_endpoint}/tasks.json`, { search: params }).map(res => {
      return res.json();
    });
  }
}
