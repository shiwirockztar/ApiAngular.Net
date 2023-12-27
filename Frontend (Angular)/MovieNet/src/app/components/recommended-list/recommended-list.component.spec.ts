import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedListComponent } from './recommended-list.component';

describe('RecommendedListComponent', () => {
  let component: RecommendedListComponent;
  let fixture: ComponentFixture<RecommendedListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendedListComponent]
    });
    fixture = TestBed.createComponent(RecommendedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
