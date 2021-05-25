import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileMetaData} from '../models/FileMetaData';
import {FileUploadMetaData} from '../models/FileUploadMetaData';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  baseUrl = 'http://localhost:8081/file'

  constructor(private http: HttpClient) { }

  getFilesMetaDataByOwner(ownerEmail: string): Observable<FileMetaData[]>{
    return this.http.get<FileMetaData[]>(this.baseUrl + '/list', {
      params: new HttpParams().set('ownerEmail', ownerEmail),
      observe: 'body',
      responseType: 'json'
    });
  }

  upload(file: File, fileUploadMetaData: FileUploadMetaData): Observable<HttpResponse<string>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(fileUploadMetaData));
    return this.http.post(this.baseUrl, formData, { observe: 'response', responseType: 'text' });
  }


}
