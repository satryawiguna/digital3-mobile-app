import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CustomValidators } from 'ng2-validation';

import { HomePage } from '../home/home';

import { UserService } from '../../providers/user.service';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html'
})
export class RegistrationPage {
  signupCredentials:any;

  email = new FormControl(null, Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]));
  password = new FormControl(null, Validators.compose([Validators.required, Validators.minLength(6)]));
  confirmPassword = new FormControl(null, CustomValidators.equalTo(this.password));

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilderCrtl: FormBuilder, public userService: UserService, public alertCtrl: AlertController,) {
    this.signupCredentials = this.formBuilderCrtl.group({
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  ionViewDidLoad() {}

  registration() {
    this.userService.signup(this.signupCredentials).then(data => {
      if (data !== undefined) {
        let alert = this.alertCtrl.create({
          title: 'Horraayyyy...!',
          subTitle: 'Well done, please check your email for activate your account',
          buttons: ['OK']
        });

        alert.present();
        this.navCtrl.pop();

      } else {
        let alert = this.alertCtrl.create({
          title: 'Ooppsss...!',
          subTitle: 'The email has already been taken',
          buttons: ['OK']
        });

        alert.present();
      }
    });
  }

}
