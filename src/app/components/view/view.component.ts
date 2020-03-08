import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  
  @Input() user: User;
  @Output() onDel: EventEmitter<User> = new EventEmitter();
  @Output() onCancel: EventEmitter<boolean> = new EventEmitter(); 
  @Output() onEdit: EventEmitter<boolean> = new EventEmitter(); 
  @Output() onNew: EventEmitter<boolean> = new EventEmitter(); 

  constructor() { }
  
  del() {
    this.onDel.emit(this.user);
  }

  edit() {
    this.onEdit.emit(true);
  }

  cancel() {
    this.onCancel.emit(true);
  }

  create() {
    this.onNew.emit(true);
  }
}
