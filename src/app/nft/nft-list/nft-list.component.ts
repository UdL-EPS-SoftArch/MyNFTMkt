import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NftService } from '../nft.service';
import { NFT } from '../../login-basic/nft';

@Component({
  selector: 'app-nft-list',
  templateUrl: './nft-list.component.html'
})
export class NftListComponent implements OnInit {
  public NFTs: NFT[] = [];
  public pageSize = 5;
  public page = 1;
  public totalNFTs = 0;

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
    this.router.navigate(['nFTs', nft.id]);
  }
}
