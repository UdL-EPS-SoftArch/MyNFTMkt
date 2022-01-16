import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NftService } from '../nft.service';
import { NFT } from '../../login-basic/nft';
import  { User } from '../../login-basic/user';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';


@Component({
  selector: 'app-bid-list',
  templateUrl: './ntf-list.component.html'
})
export class NftListComponent implements OnInit {
  public nfts: NFT[] = [];
  public pageSize = 5;
  public page = 1;
  public totalNfts = 0;

  constructor(
    public router: Router,
    private nftService: NftService,
    private authenticationBasicService: AuthenticationBasicService, ) {
  }

  ngOnInit(): void {
    this.nftService.getAll({size: this.pageSize}).subscribe(
      (nfts: NFT[]) => {
        this.nfts = nfts;
        console.log(this.nfts);
        
        this.totalNfts = this.nftService.totalElement();
      });
  }

  changePage(): void {
    this.nftService.page(this.page - 1).subscribe(
      (nft: NFT[]) => this.nfts = nft);
  }

  getCurrentUser(): User {
    return this.authenticationBasicService.getCurrentUser();
  }
}
