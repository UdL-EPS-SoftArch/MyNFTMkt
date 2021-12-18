import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NftService } from '../nft.service';
import { Sort } from '@lagoshny/ngx-hal-client';
import { Nft } from '../../login-basic/nft';
import {Offer} from '../../login-basic/offer';
import {OfferService} from '../../offer/offer.service';

@Component({
  selector: 'app-bid-list',
  templateUrl: './ntf-list.component.html'
})
export class NftListComponent implements OnInit {
  public nfts: Nft[] = [];
  public pageSize = 5;
  public page = 1;
  public totalNfts = 0;

  constructor(
    public router: Router,
    private nftService: NftService,
    private offerService: OfferService) {
  }

  ngOnInit(): void {
    this.nftService.getAll({size: this.pageSize}).subscribe(
      (nfts: Nft[]) => {
        this.nfts = nfts;
        console.log(this.nfts);
        this.totalNfts = this.nftService.totalElement();
      });
  }

  changePage(): void {
    this.nftService.page(this.page - 1).subscribe(
      (nft: Nft[]) => this.nfts = nft);
  }
}
