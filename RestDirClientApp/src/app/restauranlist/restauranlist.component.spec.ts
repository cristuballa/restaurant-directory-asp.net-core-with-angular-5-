import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauranlistComponent } from './restauranlist.component';

describe('RestauranlistComponent', () => {
  let component: RestauranlistComponent;
  let fixture: ComponentFixture<RestauranlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestauranlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestauranlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
