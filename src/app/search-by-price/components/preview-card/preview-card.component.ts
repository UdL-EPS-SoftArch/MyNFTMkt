import {Component, Input, OnInit} from '@angular/core';
import {FixedPriceOffer} from '../../../offer/fixedPriceOffer/fixedpriceoffer';

@Component({
  selector: 'app-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.css']
})
export class PreviewCardComponent implements OnInit {
  @Input()
  fixedPriceOffers: FixedPriceOffer[];
  constructor() { }

  ngOnInit(): void {
  }

}
