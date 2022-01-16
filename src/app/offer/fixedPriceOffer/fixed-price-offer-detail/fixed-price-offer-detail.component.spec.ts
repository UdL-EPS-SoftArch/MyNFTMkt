import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedPriceOfferDetailComponent } from './fixed-price-offer-detail.component';

describe('FixedPriceOfferDetailComponent', () => {
  let component: FixedPriceOfferDetailComponent;
  let fixture: ComponentFixture<FixedPriceOfferDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedPriceOfferDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedPriceOfferDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
