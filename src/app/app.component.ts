import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginPage } from './login/login.page';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  rootPage: any = LoginPage;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private uS: UserService,
    private router: Router,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.uS.cargarStorage().then(existe => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        if (existe) {
          this.navCtrl.navigateRoot(['/main/tabs/tab1']);
        } else {
          this.navCtrl.navigateRoot(['/']);
        }
      });
    });
  }
}
