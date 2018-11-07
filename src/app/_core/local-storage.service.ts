import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
    clear(): void {
        localStorage.clear();
    }

    get(key: string): any {
        const text = localStorage.getItem(key);
        if (this.IsJson(text)) {
            return JSON.parse(text);
        } else {
            return text;
        }
    }

    set(key: string, value: any): void {
        if (typeof value !== 'undefined' && value != null && value !== 'null' && value !== '') {
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            localStorage.setItem(key, value);
        } else {
            this.remove(key);
        }
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }

    IsJson1(text) {
        try {
            JSON.parse(text);
        } catch (e) {
            return false;
        }
        return true;
    }

    IsJson(text) {
        if (typeof text !== 'string') {
            return false;
        }
        try {
            JSON.parse(text);
            return true;
        } catch (error) {
            return false;
        }
    }
}
