import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  code!: string;
  mode!: string;
  bool = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['mode']) {
        this.code = params['oobCode'];
        this.mode = params['mode'];
        this.bool = true;
      }
        });
  }

}
