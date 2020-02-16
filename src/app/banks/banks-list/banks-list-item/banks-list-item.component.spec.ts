import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanksListItemComponent } from './banks-list-item.component';

describe('BanksListItemComponent', () => {
  let component: BanksListItemComponent;
  let fixture: ComponentFixture<BanksListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanksListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanksListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
