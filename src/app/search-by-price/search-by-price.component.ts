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
  constructor() { }

  ngOnInit(): void {
  }

  getTextClick(textInput): void{
    console.warn(textInput);
    this.actualText = textInput;
    // Cridaria funcio de cerca
    this.searchForResults();
  }
  private searchForResults(): void{
    // Enlloc de PREVIEWCARDS ficaria la llista que haguerem aconseguit de la cerca

    this.previewCards = PREVIEWCARDS;
  }



}
