import {Component} from '@angular/core';
import {FirebaseUISignInSuccessWithAuthResult} from 'firebaseui-angular';
import {FirebaseUISignInFailure} from 'firebaseui-angular';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  constructor(private logger: NGXLogger) {
  }

  successCallback(ev: FirebaseUISignInSuccessWithAuthResult) {
  }

  errorCallback(ev: FirebaseUISignInFailure) {
    this.logger.error('LogInComponent: errorCallback() :', ev);
  }
}

