import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class MovieService {
  movies: Array<any>;
  item: any;
  isGridView: boolean = true;
  page: number = 1;
  search: string = '';
  custom: any = {
      type: null,
      genre: null,
      order: {
        column: 0,
        dir: 'desc'
      }
  };

  constructor(public http: Http) {}

  getAll(page, search, custom) {
    let params = new URLSearchParams();
    params.set('page', page);
    params.set('search', search);
    params.set('custom', JSON.stringify(custom));

    let options = new RequestOptions({ search: params });

    return this.http.get('http://api.digital3bali.com/api/product/getAllProducts', options)
      .toPromise()
      .then(res => res.json(), err => console.log(err));
  }

  getDetail(id) {
    let params = new URLSearchParams();
    params.set('id', id);

    let options = new RequestOptions({ search: params });

    return this.http.get('http://api.digital3bali.com/api/product/getDetailProducts', options)
      .toPromise()
      .then(res => res.json(), err => console.log(err));
  }
}
