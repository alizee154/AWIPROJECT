import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFicheComponent } from './view-fiche.component';

describe('ViewFicheComponent', () => {
  let component: ViewFicheComponent;
  let fixture: ComponentFixture<ViewFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFicheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
