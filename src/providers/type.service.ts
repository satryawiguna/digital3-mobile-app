import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class TypeService {
  types: any;

  constructor(public http: Http) {}

  getAll() {
    return this.http.get('http://api.digital3bali.com/api/productType/getAllProductTypes')
      .toPromise()
      .then(res => res.json(), err => console.log(err));
  }
}
