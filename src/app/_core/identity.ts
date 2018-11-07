// // https://github.com/auth0/angular2-jwt
// import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';

// @Injectable()
// export class Identity {
//     id: string;
//     email: string;
//     token: string;
//     setToken(token: string) {
//         localStorage.setItem('token', token);
//     }

//     get(property: string) {
//         const myRawToken = localStorage.getItem('token');

//         if (myRawToken == null) {
//             return undefined;
//         }

//         const helper = new JwtHelperService();

//         switch (property) {
//             case 'rawToken':
//                 return myRawToken;
//             case 'token':
//                 return myRawToken;
//             case 'expirationDate':
//                 return helper.getTokenExpirationDate(myRawToken);
//             case 'isExpired':
//                 return helper.isTokenExpired(myRawToken).toString();
//             default:
//                 return undefined;
//         }
//     }

//     invalidateToken() {
//         localStorage.removeItem('token');
//     }
// }
