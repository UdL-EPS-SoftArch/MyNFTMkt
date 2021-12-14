import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-by-price',
  templateUrl: './search-by-price.component.html',
  styleUrls: ['./search-by-price.component.css']
})
export class SearchByPriceComponent implements OnInit {

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
