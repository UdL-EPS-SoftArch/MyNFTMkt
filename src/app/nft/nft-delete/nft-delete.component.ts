import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location } from '@angular/common'

import {NFT} from '../../login-basic/nft';
import {NftService } from '../nft.service'

@Component({
  selector: 'app-nft-delete',
  templateUrl: './nft-delete.component.html',
})
export class NftDeleteComponent implements OnInit {
  public nft: NFT = new NFT();
  public idNFT: string;

    constructor(private route: Router,
                private location: Location,
               private nftService: NftService,
    ) {
    }

  ngOnInit(): void {
     this.id = this.route.snapshot.paramMap.get('id');
     this.NftService.get(this.id).subscribe(
       nft => this.nft = nft);
   }
  delete(): void {
    this.NftService.delete(this.sale).subscribe(
      () => {
        this.router.navigate(['/nfts']);
      });
  }
}
