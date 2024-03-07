import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamPageComponent } from './cam-page.component';

describe('CamPageComponent', () => {
  let component: CamPageComponent;
  let fixture: ComponentFixture<CamPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
