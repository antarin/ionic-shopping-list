import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";
import {AlertController, LoadingController} from "ionic-angular";


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  onSignin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Beléptetés...'
    });
    loading.present();
    this.authService.signin(form.value.email, form.value.password)
      .then( data => {
        loading.dismiss();
      })
      .catch( error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Hiba a belépés során!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

}
