import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewplaceComponent } from './newplace.component';

describe('NewplaceComponent', () => {
  let component: NewplaceComponent;
  let fixture: ComponentFixture<NewplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewplaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
