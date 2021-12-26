import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostByTagComponent } from './post-by-tag.component';

describe('PostByTagComponent', () => {
  let component: PostByTagComponent;
  let fixture: ComponentFixture<PostByTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostByTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostByTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
