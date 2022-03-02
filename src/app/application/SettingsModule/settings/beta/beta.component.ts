import { Report } from './../../../../BetaTest/report';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { icon } from 'src/app/shared/lexique';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BetaService } from 'src/app/BetaTest/beta.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-beta',
  templateUrl: './beta.component.html',
  styleUrls: ['./beta.component.scss']
})
export class BetaComponent implements OnInit {

  // ENUM ICON
  icon = icon;

  betaForm !: FormGroup;

  source!: Report[];
    // TABLE ORDER
    displayedColumns: string[] = ['index', 'title', 'date', 'state'];

    @ViewChild(MatSort) sort!: MatSort;

  constructor(private beta: BetaService) { }

  ngOnInit(): void {
    this.beta.readAllReports$().subscribe(reports => this.source = reports);

    this.betaForm = new FormGroup({
      title: new FormControl('', Validators.required),
      explain: new FormControl('', Validators.required),
      date: new FormControl(new Date)
    });
  }

  sendReport(): void {
    const formValue: Report = {
      date: this.betaForm.value.date,
      title: this.betaForm.value.title,
      explain: this.betaForm.value.explain,
      state: false
    };

    this.beta.createReport(formValue);
    this.betaForm.patchValue({
      title: '',
      explain: '',
      date: new Date
    });
  }
}
