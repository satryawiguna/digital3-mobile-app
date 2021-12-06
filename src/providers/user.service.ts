import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class UserService {
  user: any;

  constructor(public http: Http) {}

  signin(signinCredentials) {
    let body = new FormData();
    body.append('email', signinCredentials.email);
    body.append('password', signinCredentials.password);

    /*let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });*/

    return this.http.post('http://api.digital3bali.com/api/auth/login', body)
      .toPromise()
      .then(res => res.json(), err => console.log(err));
  }

  signup(signupCredentials) {
    let body = new FormData();
    body.append('email', signupCredentials.email);
    body.append('password', signupCredentials.password);

    return this.http.post('http://api.digital3bali.com/api/auth/signup', body)
      .toPromise()
      .then(res => res.json(), err => console.log(err));
  }

  recovery(forgotPasswordCredentials) {
    let body = new FormData();
    body.append('email', forgotPasswordCredentials.email);

    return this.http.post('http://api.digital3bali.com/api/auth/recovery', body)
      .toPromise()
      .then(res => res.json(), err => console.log(err));
  }

  getAuthenticatedUser(token) {
    let params = new URLSearchParams();
    params.set('token', token);

    let options = new RequestOptions({ search: params });

    return this.http.get('http://api.digital3bali.com/api/auth/getAuthenticatedUser', options)
      .toPromise()
      .then(res => res.json(), err => console.log(err));
  }
}
