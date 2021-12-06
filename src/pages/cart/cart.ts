import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login';
import { CheckoutPage } from '../checkout/checkout';

import { UserService } from '../../providers/user.service';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  carts: Array<any>;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public userService: UserService, public storage: Storage) {}

  ionViewDidLoad() {
    this.setFilteredItems();
  }

  setFilteredItems() {
    this.storage.ready().then(() => {
      let loader = this.loadingCtrl.create({
        content: 'Loading...',
      });

      loader.present().then(() => {
        this.storage.get('items').then((val) => {
          this.carts = val;
          loader.dismiss();
        });
      });
    });
  }

  clearCart() {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Do you want to clear the cart?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {}
        },
        {
          text: 'Ok',
          handler: () => {
            this.storage.ready().then(() => {
              this.storage.clear();
              this.setFilteredItems();
            });
          }
        }
      ]
    });

    confirm.present();
  }

  removeItem(index) {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Do you want to take out this item?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {}
        },
        {
          text: 'Ok',
          handler: () => {
            this.carts.splice(index, 1);
            this.storage.set('items', this.carts);
            this.setFilteredItems();
          }
        }
      ]
    });

    confirm.present();
  }

  checkOut() {
    this.storage.get('user').then((val) => {
      this.user = val;

      if (this.user === null) {
        this.navCtrl.push(LoginPage);
      } else {
        this.userService.getAuthenticatedUser(this.user.token).then(data => {
          if (data !== undefined) {
            if (data.error.statusText == 'user_not_found' || data.error.statusText == 'token_expired' || data.error.statusText == 'token_invalid' || data.error.statusText == 'token_absent') {
              this.storage.remove('user');
              this.navCtrl.push(LoginPage);
            } else {
              this.navCtrl.push(CheckoutPage);
            }
          } else {
            this.storage.remove('user');
            this.navCtrl.push(LoginPage);
          }
        });
      }
    });
  }

}
