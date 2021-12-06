import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { RegistrationPage } from '../registration/registration';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

import { UserService } from '../../providers/user.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  signinCredentials:any;
  user: any;

  email = new FormControl(null, Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]));
  password = new FormControl(null, Validators.required);

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService, public alertCtrl: AlertController, public formBuilderCrtl: FormBuilder, public storage: Storage) {
    this.signinCredentials = this.formBuilderCrtl.group({
      email: this.email,
      password: this.password
    });
  }

  ionViewDidLoad() {}

  login() {
    this.userService.signin(this.signinCredentials).then(data => {
      if (data !== undefined) {
        this.storage.ready().then(() => {
          this.storage.set('user', data.dto);
        });
        this.navCtrl.popToRoot();
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ooppsss...!',
          subTitle: 'Sorry, you are not authorized!',
          buttons: ['OK']
        });

        alert.present();
      }
    });
  }

  registration() {
    this.navCtrl.push(RegistrationPage);
  }

  forgotPassword() {
    this.navCtrl.push(ForgotPasswordPage);
  }

}
