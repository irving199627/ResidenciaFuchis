import { Component, OnInit, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titulo;
  @Input() idMenu;
  constructor( private menu: MenuController,
               private uS: UserService ) { }

  ngOnInit() {}

  openFirst() {
    console.log(this.idMenu);
    this.menu.enable(true, this.idMenu);
    this.menu.open(this.idMenu);
  }
  logOut() {
    this.uS.borrarStorage();
  }

}
