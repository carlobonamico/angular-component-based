import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

  constructor() { }
  log(message: string)
  {
      console.log("LOG "+message);
  }
}