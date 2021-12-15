import {Component, Input, OnInit} from '@angular/core';
import {PreviewCard} from '../../../PreviewCard';

@Component({
  selector: 'app-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.css']
})
export class PreviewCardComponent implements OnInit {
  @Input()
  previewCards: PreviewCard[];
  constructor() { }

  ngOnInit(): void {
  }

}
