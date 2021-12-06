import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class CheckoutService {

  constructor(public http: Http) {}

  sendOrder(checkoutCredentials, token) {
    let body = new FormData();
    body.append('name', checkoutCredentials.name);
    body.append('email', checkoutCredentials.email);
    body.append('place_of_stay', checkoutCredentials.place_of_stay);
    body.append('phone', checkoutCredentials.phone);
    body.append('payment_method', checkoutCredentials.payment_method);
    body.append('delivery_or_pickup', checkoutCredentials.delivery_or_pickup);
    body.append('type_of_device', checkoutCredentials.type_of_device);
    body.append('additional_note', checkoutCredentials.additional_note);
    body.append('order', checkoutCredentials.order);

    let params = new URLSearchParams();
    params.set('token', token);

    let options = new RequestOptions({ search: params });

    return this.http.post('http://api.digital3bali.com/api/checkout/sendOrder', body, options)
      .toPromise()
      .then(res => res.json(), err => console.log(err));
  }
}
