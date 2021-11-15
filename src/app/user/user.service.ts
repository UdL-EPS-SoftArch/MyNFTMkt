import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RestService } from '@lagoshny/ngx-hal-client';
import { User } from '../login-basic/user';

@Injectable()
export class UserService extends RestService<User> {

  constructor(injector: Injector) {
    super(User, 'users', injector);
  }

  public findByUsernameContaining(text: string): Observable<User[]> {
    const options: any = {params: [{key: 'text', value: text}]};
    return this.search('findByUsernameContaining', options);
  }
}
