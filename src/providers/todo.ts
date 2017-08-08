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

  create(params?) {
    return this.http.post(`${environment.api_endpoint}/tasks.json`, params).map(res => {
      return res.json();
    });
  }

  delete(id) {
    return this.http.delete(`${environment.api_endpoint}/todo/${id}`).map(res => {
      return res.json();
    });
  }

  update(id, params) {
    return this.http.put(`${environment.api_endpoint}/todo/${id}`, params).map(res => {
      return res.json();
    });
  }
}
