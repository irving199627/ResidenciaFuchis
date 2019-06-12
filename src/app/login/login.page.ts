import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public uS: UserService) { }

  ngOnInit() {
  }


}
