import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
})
export class TokenStorageService {
    TOKEN_KEY = 'auth-token';
    USER_KEY = 'auth-user';
    constructor() { }
    public getToken(): string | null {
        return sessionStorage.getItem(this.TOKEN_KEY);
    }
    setToken(token: string): void {
        sessionStorage.removeItem(this.TOKEN_KEY);
        sessionStorage.setItem(this.TOKEN_KEY, token);
    }
    getUser() {
        return sessionStorage.getItem(this.USER_KEY);
    }
    setUser(user: any): void {
        sessionStorage.removeItem(this.USER_KEY);
        sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
    clearStorage(): void {
        sessionStorage.clear();
    }

}