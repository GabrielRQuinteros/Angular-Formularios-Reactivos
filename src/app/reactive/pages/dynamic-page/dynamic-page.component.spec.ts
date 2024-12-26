import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamycPageComponent } from './dynamic-page.component';

describe('DinamycPageComponent', () => {
  let component: DinamycPageComponent;
  let fixture: ComponentFixture<DinamycPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DinamycPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DinamycPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
