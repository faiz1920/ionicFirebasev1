import { Component, OnInit } from '@angular/core';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FireBaseService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  async loginUser(form): Promise<void> {
    this.firebaseService.loginUser(form.value.email, form.value.password).then(
      () => {
        this.router.navigateByUrl('home');
      },
      async error => {
        const alert = await this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'ok', role: 'cancel' }]
        });
        await alert.present();
      }
    );
  }

  gotoResetPassword() {
    this.router.navigateByUrl('password-reset');
  }

  gotoSignUp() {
    this.router.navigateByUrl('sign-up');
  }

}
