import { Component, OnInit } from '@angular/core';
import {PreviewCard} from '../PreviewCard';
import {PREVIEWCARDS} from '../mock-previewCards';

@Component({
  selector: 'app-search-by-price',
  templateUrl: './search-by-price.component.html',
  styleUrls: ['./search-by-price.component.css']
})
export class SearchByPriceComponent implements OnInit {
  previewCards: PreviewCard[]= PREVIEWCARDS;
  imageTestSource:string = '';


  constructor() { }

  ngOnInit(): void {
  }

  actualText1: string = "";
  actualText2: string = "";

  getText(textInput){
    console.warn(textInput);
    this.actualText1 = textInput;
  }

  getTextClick(textInput){
      console.warn(textInput);
      this.actualText2 = textInput;
   }

}
