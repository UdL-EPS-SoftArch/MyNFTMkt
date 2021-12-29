import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedPriceOfferListComponent } from './fixed-price-offer-list.component';

describe('FixedPriceOfferListComponent', () => {
  let component: FixedPriceOfferListComponent;
  let fixture: ComponentFixture<FixedPriceOfferListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedPriceOfferListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedPriceOfferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
