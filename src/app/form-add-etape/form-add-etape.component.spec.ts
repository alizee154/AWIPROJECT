import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddEtapeComponent } from './form-add-etape.component';

describe('FormAddEtapeComponent', () => {
  let component: FormAddEtapeComponent;
  let fixture: ComponentFixture<FormAddEtapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAddEtapeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddEtapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
