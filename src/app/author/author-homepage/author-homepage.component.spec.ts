import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorHomepageComponent } from './author-homepage.component';

describe('AuthorHomepageComponent', () => {
  let component: AuthorHomepageComponent;
  let fixture: ComponentFixture<AuthorHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorHomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
