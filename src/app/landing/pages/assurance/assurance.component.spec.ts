import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssuranceComponent } from './assurance.component';

describe('AssuranceComponent', () => {
  let component: AssuranceComponent;
  let fixture: ComponentFixture<AssuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssuranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
