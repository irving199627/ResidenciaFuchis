import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  usuario;
  data = false;

  constructor(
               public uS: UserService,
               private menu: MenuController
             ) {
    this.uS.inicializarUsuario().subscribe(data => {
      this.usuario = data;
      this.data = true;
      console.log(this.usuario);
    });
  }
  openFirst() {
    this.menu.enable(true, 'second');
    this.menu.toggle('second');
  }
}
