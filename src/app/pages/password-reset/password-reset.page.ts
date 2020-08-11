import { Component, OnInit } from '@angular/core';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {

  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FireBaseService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  async resetPassword(form): Promise<void> {
    this.firebaseService.resetPassword(form.value.email).then(
      async () => {
        const alert = await this.alertCtrl.create({
          message: 'Check email to reset password',
          buttons: [{
            text: 'ok', role: 'cancel', handler: () => {
              this.router.navigateByUrl('login');
            }
          }]
        });
        await alert.present();
      },
      async error => {
        const errorAlert = await this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'ok', role: 'cancel' }]
        });
        await errorAlert.present();
      }
    );
  }

}
