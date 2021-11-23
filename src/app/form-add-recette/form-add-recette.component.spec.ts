import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddRecetteComponent } from './form-add-recette.component';

describe('FormAddRecetteComponent', () => {
  let component: FormAddRecetteComponent;
  let fixture: ComponentFixture<FormAddRecetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAddRecetteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
