import { icon } from 'src/app/shared/lexique';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  // ENUM ICON
  icon = icon;

  select = 1;

  constructor() { }

  ngOnInit(): void {
  }
}
