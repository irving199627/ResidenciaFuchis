import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor( public navCtrl: NavController ) {}


}
