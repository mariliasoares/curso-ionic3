import { Injectable } from '@angular/core';

@Injectable()
export class ApiServiceProvider {

  private _url: string = 'http://10.47.121.255:8080/api';

  get url() {
    return this._url;
  }

}
