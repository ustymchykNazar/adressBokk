import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class BdService {
  private data: User[];

  constructor() {
    this.data = [
      {
        id: '_asd',
        firstName: 'Daisy',
        middleName: 'May',
        lastName: 'Barker',
        birth: '2020-01-01',
        phone: [
          {
            name: 'mobile',
            value: '+111'
          },
          {
            name: 'home',
            value: '+222'
          },
        ],
        email: ['some@email.com', 'some@email.com']
      },
      {
        id: '_asda',
        firstName: 'Yanis',
        middleName: 'Roman',
        lastName: 'Anthony',
        birth: '2020-01-01',
        phone: [
          {
            name: 'mobile',
            value: '+333'
          },
          {
            name: 'home',
            value: '+444'
          },
        ],
        email: ['some@email.com', 'some@email.com']
      },
      {
        id: '_asdaqwe',
        firstName: 'Mustafa',
        middleName: 'Remy',
        lastName: 'Simpson',
        birth: '2020-01-01',
        phone: [
          {
            name: 'mobile',
            value: '+555'
          },
          {
            name: 'home',
            value: '+666'
          },
        ],
        email: ['some@email.com', 'some@email.com']
      },
    ];
  }

  getAll(): Observable<User[]> {
    return new Observable(observer => {
      observer.next(this.data);
      observer.complete();
    })
  }

  add(user: User): Observable<User[]> { 
    return new Observable(observer => {
      this.data.push(user);
      observer.next(this.data);
      observer.complete();
    })
  }

  update(user: User): Observable<User[]> {
    return new Observable(observer => {
      this.data = this.data.map(bdUser => bdUser.id === user.id ? user : bdUser);
      observer.next(this.data);
      observer.complete();
    })
  }

  del(user: User): Observable<User[]> {
    return new Observable(observer => {
      this.data = this.data.filter(bdUser => bdUser.id !== user.id);
      observer.next(this.data);
      observer.complete()
    })
  }
}
