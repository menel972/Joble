import { ActivatedRoute } from '@angular/router';
import { CRUDService } from './../../../../shared/crud.service';
import { MatDialog } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoComponent } from './info.component';

describe('InfoComponent', () => {
  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;
  let MatDialogSpy;
  let CRUDServiceSpy;
  let ActivatedRouteSpy;

  beforeEach(async () => {
    MatDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    CRUDServiceSpy = jasmine.createSpyObj('CRUDService', ['readAllJobs$', 'updateJob']);
    ActivatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['paramMap']);

    await TestBed.configureTestingModule({
      declarations: [ InfoComponent ],
      providers: [
        {provide: MatDialog, useValue: MatDialogSpy},
        {provide: CRUDService, useValue: CRUDServiceSpy},
        {provide: ActivatedRoute, useValue: ActivatedRouteSpy}
      ]
    })
    .compileComponents();

    TestBed.inject(MatDialog);
    TestBed.inject(CRUDService);
    TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
