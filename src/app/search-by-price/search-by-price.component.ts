import {Component, OnInit} from '@angular/core';
import {FixedPriceOffer} from '../offer/fixedPriceOffer/fixedpriceoffer';
import {FixedPriceOfferService} from '../offer/fixedPriceOffer/fixed-price-offer.service';

@Component({
  selector: 'app-search-by-price',
  templateUrl: './search-by-price.component.html',
  styleUrls: ['./search-by-price.component.css']
})
export class SearchByPriceComponent implements OnInit {
  actualText = '';
  fixedPriceOffers: FixedPriceOffer[] = [];
  searchedPrice: number;
  private fixedPriceOfferService: FixedPriceOfferService;
  constructor(
    /*private fixedPriceOfferService: FixedPriceOfferService*/) {
  }

  ngOnInit(): void {
  }

  getTextClick(textInput: string): void{
    console.warn(textInput);
    this.actualText = textInput;
    this.searchedPrice = parseInt(textInput);
    // Cridaria funcio de cerca
    this.searchForResults();
  }
  private searchForResults(): void{
    this.fixedPriceOffers = [];
    console.log(this.fixedPriceOffers);
    this.fixedPriceOfferService.findAllByPriceIsLessThanEqual( this.searchedPrice).subscribe(
      (fixedPriceOffers: FixedPriceOffer[]) => {
        this.fixedPriceOffers = fixedPriceOffers;
      }
    );

    // Enlloc de PREVIEWCARDS ficaria la llista que haguerem aconseguit de la cerca
    /*var i:number = 0;
    for(i;FIXED_PRICE_OFFERS.length-1;i++) {
      if (this.searchedPrice >= FIXED_PRICE_OFFERS[i].actualPrice) {
        this.fixedPriceOffers.push(FIXED_PRICE_OFFERS[i]);
      }
    };
    */

  }



}
