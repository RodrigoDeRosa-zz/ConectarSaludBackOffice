import { Injectable } from '@angular/core';
import { Observable as __Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  static USER_KEY = 'userLoggedIn';

  constructor() { }

  createUserOnSession(data): __Observable<any[]> {
    let date=new Date();
    const user = {
      'dni': data.dni,
      'role': data.role,
      'lastClick':  new Date().getTime()

    };
    this.saveOnSession(SessionService.USER_KEY, user);
    return this.getFromSession(SessionService.USER_KEY);
  }
  updateUserSession(user)
  {
    this.saveOnSession(SessionService.USER_KEY, user);
    return this.getFromSession(SessionService.USER_KEY);
  }
  getUserFromSession(){
    return this.getFromSession(SessionService.USER_KEY);
  }

  removeUserFromSession(){
    return this.deleteFromSession(SessionService.USER_KEY);
  }

  // save a value into an index location
  saveOnSession(item, value){
    sessionStorage.setItem(item, JSON.stringify(value));
  }

  // get a value from an index location
  getFromSession(item){
    return JSON.parse(sessionStorage.getItem(item));
  }

  // delete a value in the index location
  deleteFromSession(item){
    sessionStorage.removeItem(item);
  }
}
