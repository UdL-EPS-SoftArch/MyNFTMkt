import {Injectable, Injector } from '@angular/core';
import { RestService } from '@lagoshny/ngx-hal-client';
import { Observable } from 'rxjs/internal/Observable';

import { NFT } from '../login-basic/nft';


@Injectable()
export class NftService extends RestService<NFT>{

  constructor(injector: Injector) {
    super(NFT, 'nfts', injector );
  }

  public findByTitle(title: string): Observable<NFT[]> {
    const options: any = {params: [ { key: 'title', value: title}]}
    return

  }



}
