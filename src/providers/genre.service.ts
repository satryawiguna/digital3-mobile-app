import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class GenreService {
  genres: any;

  constructor(public http: Http) {}

  getAll(id) {
    return this.http.get('http://api.digital3bali.com/api/productGenre/getAllProductGenres/' + id)
      .toPromise()
      .then(res => res.json(), err => console.log(err));
  }
}
