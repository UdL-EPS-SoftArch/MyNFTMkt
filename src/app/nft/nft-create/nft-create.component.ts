import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import  { User } from '../../login-basic/user';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import {NFT} from '../../login-basic/nft';
import {NftService } from '../nft.service';

@Component({
  selector: 'app-nft-create',
  templateUrl: './nft-create.component.html'
})
export class NftCreateComponent implements OnInit {
  public nft: NFT;
  public idNFT: string;
  public author: User;
  public owner: User;


  constructor(private route: Router,
              private location: Location,
              private nftService: NftService,
              private autenticationBasicService: AuthenticationBasicService,
  ) {
  }

  ngOnInit(): void {
    this.idNFT = this.route.url.substr(0, this.route.url.lastIndexOf('/nFTs'));
    this.nft = new NFT();
  }

  onSubmit(): void{
    this.nft.id = this.idNFT;
    this.nft.author = this.autenticationBasicService.getCurrentUser();
    this.nft.owner = this.autenticationBasicService.getCurrentUser();
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
