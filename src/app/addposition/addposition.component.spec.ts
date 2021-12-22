import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpositionComponent } from './addposition.component';

describe('AddpositionComponent', () => {
  let component: AddpositionComponent;
  let fixture: ComponentFixture<AddpositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
