import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartebancaireComponent } from './cartebancaire.component';

describe('CartebancaireComponent', () => {
  let component: CartebancaireComponent;
  let fixture: ComponentFixture<CartebancaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartebancaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartebancaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
