import { Injectable } from '@angular/core';
import { Utilities } from '../utils/utils-other';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpProxyService {

	constructor(private _http: HttpClient) {}

	public proxyfyURL(url: string): string {
		return Utilities.proxyfyURL(url);
	}

	public get<T>(url: string, options?: any): Observable<any> {
		return this._http.get<T>(this.proxyfyURL(url), options);
	}

	public post<T>(url: string, body: any, options?: any): Observable<any> {
		return this._http.post<T>(this.proxyfyURL(url), body, options);
	}
}
