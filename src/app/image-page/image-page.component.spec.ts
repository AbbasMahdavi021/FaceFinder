import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePageComponent } from './image-page.component';

describe('ImagePageComponent', () => {
  let component: ImagePageComponent;
  let fixture: ComponentFixture<ImagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
