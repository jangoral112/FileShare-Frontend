import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileMetaData } from '../models/FileMetaData';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  baseUrl = 'http://localhost:8081/file'

  constructor(private http: HttpClient) { }

  getFileMetaDataListByOwner(ownerEmail: string): Observable<FileMetaData[]>{
    return this.http.get<FileMetaData[]>(this.baseUrl + '/list', {
      params: new HttpParams().set('ownerEmail', ownerEmail),
      observe: 'body',
      responseType: 'json'
    });
  }
}
