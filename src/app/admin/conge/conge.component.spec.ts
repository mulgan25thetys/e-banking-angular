import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeComponent } from './conge.component';

describe('CongeComponent', () => {
  let component: CongeComponent;
  let fixture: ComponentFixture<CongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
