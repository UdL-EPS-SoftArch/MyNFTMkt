import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NftService } from '../nft.service';
import { NFT } from '../../login-basic/nft';
import {User} from "../../login-basic/user";
import {switchMap} from "rxjs/operators";
import {OfferService} from "../../offer/offer.service";
import {HighestBidOffer} from "../../login-basic/highestBidOffer";
import {FixedPriceOffer} from "../../offer/fixedPriceOffer/fixedpriceoffer";
import {HighestBidOfferService} from "../../highestBidOffer/highestBidOffer.service";
import {FixedPriceOfferService} from "../../offer/fixedPriceOffer/fixed-price-offer.service";
import {DecliningService} from "../../declining/declining.service";
import {Offer} from "../../login-basic/offer";
import {Observable} from "rxjs/internal/Observable";
import {Declining} from "../../declining/declining";

@Component({
  selector: 'app-nft-list',
  templateUrl: './nft-list.component.html',
  styleUrls: ['nft-list.component.css'],

})
export class NftListComponent implements OnInit {
  public NFTs: NFT[] = [];
  public pageSize = 5;
  public page = 1;
  public totalNFTs = 0;
  public highestBidOffer: HighestBidOffer = new HighestBidOffer();
  public fixedPriceOffer: FixedPriceOffer = new FixedPriceOffer();
  public decline: Declining = new Declining();
  constructor(
    public router: Router,
    private nftService: NftService,
    private offerService: OfferService,
    private highestBidOfferService: HighestBidOfferService,
    private fixedPriceOfferService: FixedPriceOfferService,
    private decliningService: DecliningService) {
  }
  deriveOffer(offer: Offer): Observable<any> {
    if (offer !== null) {
      if (offer.uri.split('/')[1] === 'highestBidOffers') {
        return this.highestBidOfferService.get(offer.uri.split('/')[2]);
      } else if (offer.uri.split('/')[1] === 'fixedPriceOffers') {
        return this.fixedPriceOfferService.get(offer.uri.split('/')[2]);
      } else {
        return this.decliningService.get(offer.uri.split('/')[2]);
      }
    }
  }
  checkIfEmpty(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }
  getNftOffers(NFTs: NFT[]): void {
    for (const nft of this.NFTs) {
      this.offerService.findByNftOrderByDateTime(nft).pipe(
        switchMap( offers => this.deriveOffer(offers[0])),
      ).subscribe((offer: any) => {
        if (offer instanceof HighestBidOffer) {
          this.highestBidOffer = offer;
        }
        else if (offer instanceof FixedPriceOffer) {
          this.fixedPriceOffer = offer;
        }
        else {
          this.decline = offer;
        }
      });
    }
  }
  ngOnInit(): void {
    this.nftService.getAll().subscribe(
      (NFTs: NFT[]) => {
        this.NFTs = NFTs;
        this.totalNFTs = this.nftService.totalElement();
        this.getNftOffers(this.NFTs);
        for (const nft of this.NFTs) {
          nft.getRelation(User, 'owner').subscribe((owner: User) => {
            nft.owner = owner;
          });
        }
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
