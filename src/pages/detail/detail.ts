import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CartPage } from '../cart/cart';

import { MovieService } from '../../providers/movie.service';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  item: any;
  items: Array<any> = [];
  message: string;

  public id: number;
  public rating: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public movieService: MovieService, public loadingCtrl: LoadingController, public storage: Storage, private toastCtrl: ToastController) {
    this.id = navParams.get('id');
  }

  ionViewDidLoad() {
    this.setFilteredItems();
  }

  setFilteredItems() {
    this.movieService.page = 1;

    let loader = this.loadingCtrl.create({
      content: 'Loading...',
    });

    loader.present().then(() => {
      this.movieService.getDetail(this.id).then(data => {
        this.movieService.item = data.dto;
        this.rating = this.movieService.item.rating;
        loader.dismiss();
      });
    });
  }

  addToCart(movie) {
    this.item  = {
      id: movie.id,
      product_type_id: movie.product_type_id,
      title: movie.title,
      featured_image_url: movie.featured_image_url
    };

    this.storage.ready().then(() => {
      this.storage.get('items').then((val) => {
        if (val == null) {
          this.items.push(this.item);
          this.storage.set('items', this.items);
          this.message  = 'Movie id: ' + this.item.id + ' has been added to cart';
          this.presentToast(this.message);

        } else {
          let hasMatch: boolean = false;

          this.items = val;

          for (var index = 0; index < this.items.length; ++index) {
            if(this.items[index].id == this.item.id) {
              this.message  = 'Movie id: ' + this.item.id + ' already added on cart';
              this.presentToast(this.message);
              hasMatch = true;
              break;
            }
          }

          if (!hasMatch) {
            this.items.push(this.item);
            this.storage.set('items', this.items);
            this.message  = 'Movie id: ' + this.item.id + ' has beed added to cart';
            this.presentToast(this.message);
          }
        }
      });
    });
  }

  viewCart() {
    this.navCtrl.push(CartPage);
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
