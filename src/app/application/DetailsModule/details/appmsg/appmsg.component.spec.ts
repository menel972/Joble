import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppmsgComponent } from './appmsg.component';

describe('AppmsgComponent', () => {
  let component: AppmsgComponent;
  let fixture: ComponentFixture<AppmsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppmsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
