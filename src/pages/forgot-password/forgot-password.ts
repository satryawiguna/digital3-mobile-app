import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { HomePage } from '../home/home';

import { UserService } from '../../providers/user.service';

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  forgotPasswordCredentials: any;

  email = new FormControl(null, Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]));

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService, public alertCtrl: AlertController, private toastCtrl: ToastController, public formBuilderCrtl: FormBuilder) {
    this.forgotPasswordCredentials = this.formBuilderCrtl.group({
      email: this.email
    });
  }

  ionViewDidLoad() {}

  recovery() {
    this.userService.recovery(this.forgotPasswordCredentials).then(data => {
      if (data !== undefined) {
        let toast = this.toastCtrl.create({
          message: 'An email has been sent, please check your email',
          duration: 3000,
          position: 'top'
        });

        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });

        toast.present();
        this.navCtrl.pop();
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ooppsss...!',
          subTitle: 'Sorry, the email is not register!',
          buttons: ['OK']
        });

        alert.present();
      }
    });
  }

}
