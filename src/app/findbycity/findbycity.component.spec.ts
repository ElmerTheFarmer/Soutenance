import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindbycityComponent } from './findbycity.component';

describe('FindbycityComponent', () => {
  let component: FindbycityComponent;
  let fixture: ComponentFixture<FindbycityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindbycityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindbycityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
