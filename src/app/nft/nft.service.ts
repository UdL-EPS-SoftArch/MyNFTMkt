import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RestService } from '@lagoshny/ngx-hal-client';
import { NFT } from '../login-basic/nft';

@Injectable()
export class NftService extends RestService<NFT> {

  constructor(injector: Injector) {
    super(NFT, 'NFTs', injector);
  }
}
