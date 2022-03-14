import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  version = 2.7;
  correctif = 3;

  constructor() { }
}
