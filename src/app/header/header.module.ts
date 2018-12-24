import { environment } from "src/environments/environment";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FirebaseUIModule, firebase, firebaseui } from "firebaseui-angular";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { LogInComponent } from "./log-in/log-in.component";
import { HeaderComponent } from "./header/header.component";
import { RegisterComponent } from "./register/register.component";
import { HeaderRouteHelperService } from "./header-route-helper.service";
import { MdcModule } from "../_core/mdc-module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "../_core/material-module";
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { DataService } from "./my-dashboard/services/data.service";
import { EditDialogComponent } from "./my-dashboard/dialogs/edit/edit.dialog.component";
import { DeleteDialogComponent } from "./my-dashboard/dialogs/delete/delete.dialog.component";
import { AddDialogComponent } from "./my-dashboard/dialogs/add/add.dialog.component";

export const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      scopes: ["public_profile", "email", "user_likes", "user_friends"],
      customParameters: {
        auth_type: "reauthenticate"
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  tosUrl: "https://www.google.com",
  privacyPolicyUrl: "https://www.google.com",
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

const IMPORTS = [
  BrowserModule,
  FormsModule,
  RouterModule,
  CommonModule,
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFireAuthModule,
  FirebaseUIModule.forRoot(firebaseUiAuthConfig),
  FlexLayoutModule,
  MdcModule,
  MaterialModule
];
const DECLARATIONS = [LogInComponent, HeaderComponent, RegisterComponent, EditDialogComponent, DeleteDialogComponent, AddDialogComponent];
const EXPORTS = [LogInComponent, HeaderComponent, RegisterComponent, EditDialogComponent, DeleteDialogComponent, AddDialogComponent];
const PROVIDERS = [HeaderRouteHelperService, DataService];

@NgModule({
  imports: [IMPORTS],
  declarations: [DECLARATIONS, MyDashboardComponent],
  exports: [EXPORTS],
  providers: [PROVIDERS],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ]
})
export class HeaderModule {}
