import {Component, OnInit} from '@angular/core';
import {PreviewCard} from '../PreviewCard';
import {PREVIEWCARDS} from '../mock-previewCards';

@Component({
  selector: 'app-search-by-price',
  templateUrl: './search-by-price.component.html',
  styleUrls: ['./search-by-price.component.css']
})
export class SearchByPriceComponent implements OnInit {
  actualText = '';
  previewCards: PreviewCard[];
  searchedPrice: number;
  constructor() { }

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
    //this.previewCards = PREVIEWCARDS;
    console.log(this.previewCards);
    // Enlloc de PREVIEWCARDS ficaria la llista que haguerem aconseguit de la cerca
    var i:number = 0;
    for(i;PREVIEWCARDS.length;i++) {
      if (this.searchedPrice >= PREVIEWCARDS[i].actualPrice) {
        this.previewCards.push(PREVIEWCARDS[i]);
      }
    };
    //PREVIEWCARDS.forEach(function(card){
    //if(this.searchedPrice >= card.actualPrice){
    //  this.previewCards.push(card);
    //  console.log(card);
    //  console.log(this.previewCards);
    //}
    //});
  }



}
