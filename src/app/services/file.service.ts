import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileMetadata} from '../models/FileMetadata';
import {FileUploadMetadata} from '../models/FileUploadMetadata';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  baseUrl = 'http://localhost:8081/file'

  constructor(private http: HttpClient) { }

  getFilesMetadataByOwner(ownerEmail: string): Observable<FileMetadata[]>{
    return this.http.get<FileMetadata[]>(this.baseUrl + '/list', {
      params: new HttpParams().set('ownerEmail', ownerEmail),
      observe: 'body',
      responseType: 'json'
    });
  }

  upload(file: File, fileUploadMetaData: FileUploadMetadata): Observable<HttpResponse<string>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(fileUploadMetaData));
    return this.http.post(this.baseUrl, formData, { observe: 'response', responseType: 'text' });
  }


}
