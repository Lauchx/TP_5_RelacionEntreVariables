import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TP5Component } from './tp-5.component';

describe('TP5Component', () => {
  let component: TP5Component;
  let fixture: ComponentFixture<TP5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TP5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TP5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
