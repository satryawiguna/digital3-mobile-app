import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';

import { CartFilter } from '../../filters/cart.filter';

import { CheckoutService } from '../../providers/checkout.service';

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})
export class CheckoutPage {
  checkoutCredentials: any;
  user: any;
  movieSummaries: Array<any>;
  tvSeriesSummaries: Array<any>;
  total: any = {
    movies: 0,
    tvSeries: 0
  };

  name = new FormControl(null, Validators.required);
  email = new FormControl(null, Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]));
  place_of_stay = new FormControl(null, Validators.required);
  phone = new FormControl(null, Validators.compose([Validators.required, Validators.pattern(/[0-9]+$/)]));
  payment_method = new FormControl(null, Validators.required);
  delivery_or_pickup = new FormControl(null, Validators.required);
  type_of_device = new FormControl(null, Validators.required);
  additional_note = new FormControl(null);

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public formBuilderCrtl: FormBuilder, public checkourService: CheckoutService, private toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.checkoutCredentials = this.formBuilderCrtl.group({
      name: this.name,
      email: this.email,
      place_of_stay: this.place_of_stay,
      phone: this.phone,
      payment_method: this.payment_method,
      delivery_or_pickup: this.delivery_or_pickup,
      type_of_device: this.type_of_device,
      additional_note: this.additional_note
    });
  }

  ionViewDidLoad() {
    let cartFilter = new CartFilter();

    this.storage.ready().then(() => {
      this.storage.get('items').then((val) => {
        this.movieSummaries = cartFilter.transform(val, 1);
        this.tvSeriesSummaries = cartFilter.transform(val, 2);

        this.total.movies = this.movieSummaries.length;
        this.total.tvSeries = this.tvSeriesSummaries.length;
      });

      this.storage.get('user').then((val) => {
        this.user = val;
        this.checkoutCredentials.email = this.user.email;
      });
    });
  }

  sendOrder() {
    this.storage.ready().then(() => {
      this.storage.get('items').then((val) => {
        this.checkoutCredentials.order = JSON.stringify(val);

        this.checkourService.sendOrder(this.checkoutCredentials, this.user.token).then(data => {
          if (data !== undefined) {
            if (data._messages[0].type == 'success') {
              let alert = this.alertCtrl.create({
                title: 'Horrayyy...!',
                subTitle: 'Your order was sent. We will soon send to you an email confirmation!',
                buttons: ['OK']
              });

              alert.present();

              this.storage.remove('items');
              this.navCtrl.push(HomePage);
            } else {
              let alert = this.alertCtrl.create({
                title: 'Ooppssss...',
                subTitle: data._messages[0].text,
                buttons: ['OK']
              });

              alert.present();
            }
          } else {
            this.presentToast('Ooppssss... there are any something problem with sendding order process. Make sure you are on stable connection of internet');
          }
        });
      });
    });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
