import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NftService } from '../nft.service';
import { Sort } from '@lagoshny/ngx-hal-client';
import { NFT } from '../../login-basic/nft';

@Component({
  selector: 'app-nft-list',
  templateUrl: './nft-list.component.html'
})
export class NFTListComponent implements OnInit {
  public NFTs: NFT[] = [];
  public pageSize = 5;
  public page = 1;
  public totalNFTs = 0;
  private sorting: Sort[] = [{ path: 'title', order: 'ASC' }];

  constructor(
    public router: Router,
    private nftService: NftService) {
  }

  ngOnInit(): void {
    /*{size: this.pageSize, sort: this.sorting}*/
    this.nftService.getAll().subscribe(
      (NFTs: NFT[]) => {
        this.NFTs = NFTs;
        this.totalNFTs = this.nftService.totalElement();
      });
  }

  changePage(): void {
    this.nftService.page(this.page - 1).subscribe(
      (NFTs: NFT[]) => this.NFTs = NFTs);
  }

  detail(nft: NFT): void {
    this.router.navigate(['NFTs', nft.id]);
  }
}
