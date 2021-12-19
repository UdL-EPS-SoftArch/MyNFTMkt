import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location } from '@angular/common'

import {NFT} from '../../login-basic/nft';

@Component({
  selector: 'app-nft-create',
  templateUrl: './nft-create.component.html'
})
export class NftCreateComponent implements OnInit {
  public nft: NFT;

  constructor(private route: Router,
              private location: Location,
             // private bidService: BidService,
  ) {
  }

  ngOnInit(): void {
  }

}
