import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileMetadata} from '../models/FileMetadata';
import {FileUploadMetadata} from '../models/FileUploadMetadata';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  baseUrl = 'http://localhost:8081/file';

  metadataUrlSuffix = '/metadata'

  constructor(private http: HttpClient) { }

  getFileMetaDataByKey(key: string): Observable<FileMetadata> {
    return this.http.get<FileMetadata>(this.baseUrl + '/' + key + this.metadataUrlSuffix, {
      observe: 'body',
      responseType: 'json'
    });
  }

  getFilesMetadata(ownerEmail: string, privateFiles: boolean): Observable<FileMetadata[]> {
    let params = new HttpParams();

    if(ownerEmail != null) {
      params = params.append('ownerEmail', ownerEmail);
    }

    if(privateFiles != null) {
      params = params.append('privateFiles', String(privateFiles));
    }

    return this.http.get<FileMetadata[]>(this.baseUrl + this.metadataUrlSuffix, {
      params: params,
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

  downloadFile(fileKey: string): Observable<HttpResponse<Blob>> {
    let params = new HttpParams().set('key', fileKey);
    return this.http.get(this.baseUrl, {params: params, responseType: 'blob', observe: 'response'})
  }

  deleteFile(fileKey: string): Observable<HttpResponse<string>> {
    let params = new HttpParams().set('key', fileKey);
    return this.http.delete(this.baseUrl, {params: params, observe: 'response', responseType: 'text'});
  }
}
