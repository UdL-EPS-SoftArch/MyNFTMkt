import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByPriceComponent } from './search-by-price.component';

describe('SearchByPriceComponent', () => {
  let component: SearchByPriceComponent;
  let fixture: ComponentFixture<SearchByPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
