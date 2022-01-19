import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location } from '@angular/common';

import {NFT} from '../../login-basic/nft';
import {NftService } from '../nft.service';
import {User} from '../../login-basic/user';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';

@Component({
  selector: 'app-nft-create',
  templateUrl: './nft-create.component.html'
})
export class NftCreateComponent implements OnInit {
  public nft: NFT;
  public idNFT: string;
  public owner: User;

  constructor(private route: Router,
              private location: Location,
              private nftService: NftService,
              private authenticationService: AuthenticationBasicService
  ) {
  }

  ngOnInit(): void {
    this.idNFT = this.route.url.substr(0, this.route.url.lastIndexOf('/nFTs'));
    this.owner = this.authenticationService.getCurrentUser();
    this.nft = new NFT();
  }

  onSubmit(): void{
    this.nft.id = this.idNFT;
    this.nftService.create(this.nft).subscribe(
      (newNFT: NFT) => {
        this.route.navigate(['nFTs']);
      }
    );
  }


  onCancel(): void {
    this.location.back();
  }
}
