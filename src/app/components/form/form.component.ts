import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{
  form = this.fb.group({
    id: [''],
    firstName: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(10),
      Validators.pattern(/^[A-Za-z]+$/)
    ]],
    middleName: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(10),
      Validators.pattern(/^[A-Za-z]+$/)
    ]],
    lastName: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(10),
      Validators.pattern(/^[A-Za-z]+$/)
    ]],
    birth: ['', [
      Validators.required
    ]],
    phone: this.fb.array([
      this.fb.group({
        name: ['', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
          Validators.pattern(/^[A-Za-z]+$/)
        ]],
        value: ['', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
          Validators.pattern(/^[0-9 ()+-]+$/)
        ]]
      })
    ]),
    email: this.fb.array([
      this.fb.control('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
      ])
    ])
  })

  @Output() onAdd: EventEmitter<User> = new EventEmitter();
  @Output() onUpdate: EventEmitter<User> = new EventEmitter();
  @Input() user: User;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    if(this.user.id) {
      for(let i = 1; i < this.user.email.length; i++ ) {
        this.addEmail();
      }
      for(let i = 1; i < this.user.phone.length; i++ ) {
        this.addPhone();
      }
      this.form.patchValue(this.user);      
    }
  }


  get email() {
    return this.form.get('email') as FormArray;
  }

  get phone() {
    return this.form.get('phone') as FormArray;
  }

  addEmail() {
    this.email.push(this.fb.control(''));
  }

  addPhone() {
    this.phone.push(this.fb.group({
      name: [''],
      value: ['']
    }))
  }

  delPhone(i: number) {
    this.phone.removeAt(i);
  }

  delEmail(i: number) {
    this.email.removeAt(i);
  }

  getId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  onSubmit() {
    let id = this.form.get('id');
    if (!id.value) {
      id.setValue(this.getId().toString());
      this.onAdd.emit(this.form.value);
    } else {
      console.log('update')
      this.onUpdate.emit(this.form.value);
    }
  }

}
