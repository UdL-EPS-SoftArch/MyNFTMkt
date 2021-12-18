import { Component, OnInit } from '@angular/core';

import {NFT} from '../../login-basic/nft';

@Component({
  selector: 'app-nft-create',
  templateUrl: './nft-create.component.html'
})
export class NftCreateComponent implements OnInit {
  public nft: NFT;

  constructor() { }

  ngOnInit(): void {
  }

}
