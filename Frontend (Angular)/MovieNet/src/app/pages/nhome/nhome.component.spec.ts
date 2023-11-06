import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhomeComponent } from './nhome.component';

describe('NhomeComponent', () => {
  let component: NhomeComponent;
  let fixture: ComponentFixture<NhomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NhomeComponent]
    });
    fixture = TestBed.createComponent(NhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
