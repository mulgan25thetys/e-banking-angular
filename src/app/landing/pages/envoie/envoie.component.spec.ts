import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoieComponent } from './envoie.component';

describe('EnvoieComponent', () => {
  let component: EnvoieComponent;
  let fixture: ComponentFixture<EnvoieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvoieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvoieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
