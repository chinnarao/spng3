// import {animate, AnimationTriggerMetadata, style, transition, trigger} from '@angular/animations';
// declare const require;
// const bowser = require('bowser');

import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable()
export class UtilsService {
    constructor(private toastrService: ToastrService) {}

    public static getBaseUrl() {
        if (window.location.host.includes('localhost')) {
            return 'http://localhost:4200';
        }
        return 'https://www.scooppages.com';
    }

    // not working
    // public static isDefined<T>(value: T | undefined | null): value is T {
    //   return <T>value !== undefined && <T>value !== null;
    // }

    //   handleSignupErrors(errorCode: string) {
    //     switch (errorCode) {
    //       case 'auth/email-already-in-use':
    //         // Thrown if there already exists an account with the given email address.
    //         this.snackBar.open('Sorry this email address is already in use! Please try again.', 'Goto Login?', {
    //           duration: 6000,
    //         });
    //         this.resetForm();
    //         break;
    //       case 'auth/invalid-email':
    //         // Thrown if the email address is not valid.
    //         this.snackBar.open('Sorry this is not a valid email address!', undefined, {
    //           duration: 6000,
    //         });
    //         break;
    //       case 'auth/operation-not-allowed':
    //         // Thrown if email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.
    //         break;
    //       case 'auth/weak-password':
    //         // Thrown if the password is not strong enough
    //         break;
    //       default:
    //       // unknown error has occured
    //     }
    //   }
    toString(error: any) {
        let message = '';
        try {
            if (typeof error === 'string') {
                message = error;
            } else if (error.status !== 0 && error.error.Message) {
                message = error.error.Message;
            } else if (error.status !== 0 && JSON.parse(error._body).message && JSON.parse(error._body).message != '') {
                message = JSON.parse(error._body).message;
            } else if (error.status !== 0 && typeof error === 'object') {
                error = error.json();
                if (error.errors) {
                    Object.keys(error.errors).map(function(objectKey, index) {
                        let value = error.errors[objectKey];
                        message += value + '\n';
                    });
                }
            } else {
                message = this.verifyHttpErrors(error);
            }
        } catch (e) {
            try {
                if (error.status !== 0 && typeof error === 'object') {
                    error = error.json();
                    if (error.errors) {
                        Object.keys(error.errors).map(function(objectKey, index) {
                            var value = error.errors[objectKey];
                            message += value + '\n';
                        });
                    }
                }
            } catch (e) {
                //treta
                message = this.verifyHttpErrors(error);
            }
        }
        if (message == '') {
            message = 'Ocorreu um erro indefinido, favor tentar ação novamente!';
        }
        return message;
    }

    verifyHttpErrors(error) {
        let message = 'Ocorreu um erro indefinido, favor tentar ação novamente!';
        if (error.status == 400) {
            message = 'Solicitação não entendida pelo servidor';
        } else if (error.status == 403) {
            message = 'Você não tem permissão';
        } else if (error.status == 500) {
            message = 'Ocorreu um erro nos nossos servidores';
        } else if (error.status == 404) {
            message = 'Não encontramos o que você está procurando nos nossos servidores';
        } else if (error.name == 'TimeoutError') {
            message = 'Tempo de requisição expirado, verifique sua conexão.';
        } else if (error.status == 503) {
            message = 'Serviço temporariamente indisponível';
        } else if (error.status == 502) {
            message = 'Falha na comunicação com o servidor';
        } else if (error.status == 501) {
            message = 'O servidor ainda não suporta a funcionalidade ativada.';
        }
        return message;
    }

    private async sendErrorToServer(errors: string[] | string): Promise<boolean> {
        if (navigator.onLine) {
            try {
                let body;
                if (Array.isArray(errors)) {
                    body = `[${errors.join(',')}]`;
                } else {
                    body = `[${errors}]`;
                }

                const response = await fetch(`${environment.apiLogglyErrorURL}`, {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                });
                if (response.ok) {
                    console.log(
                        '%cAppGlobalErrorhandler success to send log report to loggly or web api',
                        'color: green'
                    );
                    return true;
                }
            } catch (error) {
                this.toastrService.error('Error logging failed!');
                console.log('AppGlobalErrorhandler failed to send log report to api');
            }
        }
        return false;
    }
}
