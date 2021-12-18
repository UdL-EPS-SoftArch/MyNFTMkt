import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RestService } from '@lagoshny/ngx-hal-client';


import {Nft} from '../login-basic/nft';
import {User} from '../login-basic/user';

@Injectable()
export class NftService extends RestService<Nft> {

  constructor(injector: Injector) {
    super(Nft, 'nFTs', injector);
  }

  



}
