import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location } from '@angular/common'

import {NFT} from '../../login-basic/nft';
import {NftService } from '../nft.service'

@Component({
  selector: 'app-nft-create',
  templateUrl: './nft-create.component.html'
})
export class NftCreateComponent implements OnInit {
  public nft: NFT;
  public idNFT: string;

  constructor(private route: Router,
              private location: Location,
             private nftService: NftService,
  ) {
  }

  ngOnInit(): void {
    this.idNFT = this.route.url.substr(0, this.route.url.lastIndexOf('/nft'));
    this.nft = new NFT();
  }

  onSubmit(): void{
    this.nft.id = this.idNFT;
    this.nftService.create(this.nft).subscribe(
      (newNFT: NFT) => {
        this.route.navigate(['nft']);
      }
    );
  }


  onCancel(): void {
    this.location.back();
  }
}
