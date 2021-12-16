import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RestService } from '@lagoshny/ngx-hal-client';
import { NFT } from '../login-basic/nft';

@Injectable()
export class NftService extends RestService<NFT> {

  constructor(injector: Injector) {
    super(NFT, 'NFTs', injector);
  }
  public findByTitle(text: string): Observable<NFT[]> {
    const options: any = {params: [{key: 'text', value: text}]};
    return this.search('findByTitle', options);
  }
}
