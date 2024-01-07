import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class RestapiService {

  constructor(private http: HttpClient) { }

  @BlockUI() blockUI: NgBlockUI;

  apiDomain: string = environment.bvApiUri;

  sessionErrorTitle: any = "Session Expired";
  sessionErrorMessage: any = "Sorry your session has been timed out. Please login again";

  serverErrorTitle: any = "Unexpected Error";
  serverErrorMessage: any = "Sorry we are facing some issues, Please try after some time.";

  

  apiCall(req): any {
    if (!req.isFullURI) {
      req.url = this.apiDomain + req.url;
    }

    if (!req.method) {
      req.method = 'post'
    }

    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

    if (req.method !== 'upload') {
      httpHeaders.set('Content-Type', 'application/json')
    }

    if (!req.noUIBlock) {
      this.blockUI.start('Please wait ...');
    }

    if (req.method.toLowerCase() === 'get') {
      return this.http.get(req.url, {
        headers: httpHeaders
      }).map((res) => {
        if (!req.noUIBlock) {
          this.blockUI.stop();
        }
        return res;
      });
    } else if (req.method.toLowerCase() === 'post') {
      return this.http.post(req.url, req.data, {
        headers: httpHeaders
      }).map((res) => {
        if (!req.noUIBlock) {
          this.blockUI.stop();
        }
        return res;
      });
    } else if (req.method.toLowerCase() === 'put') {
      return this.http.put(req.url, req.data, {
        headers: httpHeaders
      }).map((res) => {
        if (!req.noUIBlock) {
          this.blockUI.stop();
        }
        return res;
      });
    } else if (req.method.toLowerCase() === 'upload') {
      //httpHeaders.set('Content-Type', 'multipart/form-data')
      return this.http.post(req.url, req.data, {
        headers: httpHeaders
      }).map((res) => {
        if (!req.noUIBlock) {
          this.blockUI.stop();
        }
        return res;
      });
    } else if (req.method.toLowerCase() === 'delete') {
      return this.http.delete(req.url, {
        headers: httpHeaders
      }).map((res) => {
        if (!req.noUIBlock) {
          this.blockUI.stop();
        }
        return res;
      });
    }
  }
}
