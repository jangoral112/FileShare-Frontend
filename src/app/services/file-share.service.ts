import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileShareWithMetadata} from '../models/FileShareWithMetadata';
import {map} from 'rxjs/operators';
import {FileShareWithMetadataResponse} from '../models/dto/FileShareWithMetadataResponse';
import {FileShareRequest} from '../models/dto/FileShareRequest';
import {DeleteFileShareRequest} from '../models/dto/DeleteFileShareRequest';

@Injectable({
  providedIn: 'root'
})
export class FileShareService {

  baseUrl = 'http://localhost:8081/file/share';

  recipientSuffix = '/recipient';

  ownerSuffix = '/owner';

  constructor(private http: HttpClient) { }

  postFileShare(ownerEmail: string, recipientEmail: string, fileKey: string): Observable<HttpResponse<string>> {
    let fileShareRequest = new FileShareRequest(ownerEmail, recipientEmail, fileKey);

    return this.http.post(this.baseUrl, fileShareRequest, {observe: 'response', responseType: 'text'});
  }

  deleteFileShare(fileKey: string, recipientEmail: string): Observable<HttpResponse<string>> {
    let deleteFileShareRequest = new DeleteFileShareRequest(fileKey, recipientEmail);
    return this.http.request('delete', this.baseUrl, {body: deleteFileShareRequest, observe: 'response', responseType: 'text'})
  }

  getFileSharesWithMetadata(): Observable<FileShareWithMetadata[]> {

    let response = this.http.get<FileShareWithMetadataResponse[]>(this.baseUrl);

    return this.fileSharesWithMetadataResponseMappingPipe(response);
  }

  getReceiptedFileSharesWithMetadata(recipientEmail: string): Observable<FileShareWithMetadata[]> {
    let params = new HttpParams();
    params = params.append('recipientEmail', recipientEmail);

    let response = this.http.get<FileShareWithMetadataResponse[]>(this.baseUrl + this.recipientSuffix, {
      params: params
    });

    return this.fileSharesWithMetadataResponseMappingPipe(response);
  }

  getOwnedFileSharesWithMetadata(ownerEmail: string): Observable<FileShareWithMetadata[]> {
    let params = new HttpParams();
    params = params.append('ownerEmail', ownerEmail);

    let response = this.http.get<FileShareWithMetadataResponse[]>(this.baseUrl + this.ownerSuffix, {
      params: params
    });

    return this.fileSharesWithMetadataResponseMappingPipe(response);
  }

  fileSharesWithMetadataResponseMappingPipe(fileSharesWithMetadataResponse: Observable<FileShareWithMetadataResponse[]>)
                                                                                                    : Observable<FileShareWithMetadata[]>  {
    return fileSharesWithMetadataResponse.pipe(
      map((fileSharesWithMetadataResponse: FileShareWithMetadataResponse[]) => {
        return fileSharesWithMetadataResponse.map(
          (fileShareWithMetadataResponse: FileShareWithMetadataResponse) => {
            return new FileShareWithMetadata(
              fileShareWithMetadataResponse.recipientEmail,
              fileShareWithMetadataResponse.recipientUsername,
              fileShareWithMetadataResponse.shareTimestamp,
              fileShareWithMetadataResponse.fileMetadataResponse
            );
          });
      }));
  }
}
