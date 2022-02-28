import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  version = 0.7;
  correctif = .2;

  constructor() { }
}
