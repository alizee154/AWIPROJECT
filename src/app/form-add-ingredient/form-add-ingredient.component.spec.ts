import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddIngredientComponent } from './form-add-ingredient.component';

describe('FormAddIngredientComponent', () => {
  let component: FormAddIngredientComponent;
  let fixture: ComponentFixture<FormAddIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAddIngredientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
