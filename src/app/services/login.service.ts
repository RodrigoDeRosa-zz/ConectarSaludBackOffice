import {EventEmitter, Injectable, Output} from '@angular/core';
import {BaseService as __BaseService} from './base.service';
import {AppConfigService as __Configuration} from '../providers/app-config.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {sha256} from 'js-sha256';
import {AuthenticatedUser} from "../models/authenticated-user";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends __BaseService {
  private authenticatePath = '/authenticate';

  @Output() getAuthenticatedUser: EventEmitter<any> = new EventEmitter();

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  authenticate(dni:string, password:string){
    let body = {
      'user_id': dni,
      'password': sha256(password)
    };
    let __headers = new HttpHeaders();
    return this.http.post(this.config.getRootUrl() + this.authenticatePath, body, {headers: __headers});
  }

  publishSuccessfullyAuthentication(result:AuthenticatedUser) {
    this.getAuthenticatedUser.emit(result);
  }
}
