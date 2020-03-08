import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() active: User;
  @Input() users: User[];
  @Output() onActive: EventEmitter<User> = new EventEmitter();

  constructor() { }

  setActive(user: User) {
    this.onActive.emit(user);
  }
}
