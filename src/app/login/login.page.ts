import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {NgForm} from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public uS: UserService,
              private navCtrl: NavController) { }

  ngOnInit() {
  }

   async login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const valido = await this.uS.login(form);

    if (valido) {
      // navegar al tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    }
  }


}
