import { Component } from '@angular/core';
import { FireBaseService } from '../services/fire-base.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private firebaseService: FireBaseService, private router: Router, private alertCtrl: AlertController) { }

  async logOut(form): Promise<void> {
    this.firebaseService.logOut().then(
      () => {
        this.router.navigateByUrl('login');
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

}
