import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { md5 } from 'js-md5';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public apiUrl: string = 'http://gateway.marvel.com/v1/public';
  public publicKey: string = '1c3e045f44c19d6e7bcfce896879a979';
  public privateKey: string = '5b394da763c51b6976453723bf127604478ca7cd';
  public ts: number = 1;
  public stringToHash: string = this.ts + this.privateKey + this.publicKey;
  public hash: string = md5(this.stringToHash);
  public offset: number = 0;
  public limit: number = 50;

  constructor(public http: HttpClient) {}

  fetchCharacters(): Observable<any> {
    return this.http
      .get<any>(
        this.apiUrl +
          `/characters?ts=${this.ts}&apikey=${this.publicKey}&hash=${this.hash}&limit=${this.limit}&offset=${this.offset}`
      )
      .pipe(map((data: any) => data.data.results));
  }
}
