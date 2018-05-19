import { Injectable } from '@angular/core';

export class LogService {

  constructor() { }
  log(message: string)
  {
      console.log("LOG "+message);
  }
}