import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishingRequestsListComponent } from './publishing-requests-list.component';

describe('PublishingRequestsListComponent', () => {
  let component: PublishingRequestsListComponent;
  let fixture: ComponentFixture<PublishingRequestsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishingRequestsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishingRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
