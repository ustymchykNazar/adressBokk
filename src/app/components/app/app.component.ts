import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { BdService } from 'src/app/services/bd.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  preloader: boolean = false;

  viewMode: boolean = false;
  users: User[] = [];
  filteredUsers: User[] = [];
  activeUser: User | {} = {};

  filter = new FormControl('');

  constructor(private _bd: BdService) {
    this.preloader = true;

    _bd
      .getAll()
      .subscribe(
        res => this.users = res,
        err => { },
        () => this.preloader = false
      )
  }

  ngOnInit() {
    this.filter.valueChanges
      .subscribe(
        res => {
          if(res.length === 0) {
            this.filteredUsers = [];
          } else {
            this.filteredUsers = this.users.filter(user => {
              if (user.firstName.includes(res) || user.middleName.includes(res) || user.lastName.includes(res)) {
                return user
              }
              if (user.phone.filter(phone => phone.value.includes(res)).length) {
                return user
              }
            })
          }
        }
      )
  }

  setActive(user: User) {
    this.activeUser = user;
    this.viewMode = true;
  }

  add(user: User) {
    this.preloader = true;
    this._bd
      .add(user)
      .subscribe(
        res => this.users = res,
        err => { },
        () => this.preloader = false
      )
  }

  update(user: User) {
    this.preloader = true;

    this._bd
      .update(user)
      .subscribe(
        res => this.users = res,
        err => { },
        () => this.preloader = false
      )
  }

  del(user: User) {
    this.preloader = true;

    this._bd
      .del(user)
      .subscribe(
        res => {
          this.users = res;
          this.viewMode = false;
          this.activeUser = {};
        },
        err => { },
        () => this.preloader = true
      )
  }

  edit() {
    this.viewMode = false;
  }

  create() {
    this.activeUser = {};
    this.viewMode = false;
  }

  cancel() {
    this.viewMode = false;
    this.activeUser = {};
  }
}
