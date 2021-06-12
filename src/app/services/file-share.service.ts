import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileShareWithMetadata} from '../models/FileShareWithMetadata';
import {FileMetadata} from '../models/FileMetadata';
import {map} from 'rxjs/operators';
import {FileShareWithMetadataResponse} from '../models/dto/FileShareWithMetadataResponse';

@Injectable({
  providedIn: 'root'
})
export class FileShareService {

  baseUrl = 'http://localhost:8081/file/share';

  recipientSuffix = '/recipient';

  ownerSuffix = '/owner';

  constructor(private http: HttpClient) { }

  getReceiptedFileSharesWithMetadata(recipientEmail: string): Observable<FileShareWithMetadata[]> {
    let params = new HttpParams();
    params = params.append('recipientEmail', recipientEmail);

    let response = this.http.get<FileShareWithMetadataResponse[]>(this.baseUrl + this.recipientSuffix, {
      params: params
    });

    return this.fileSharesWithMetadataResponseMappingPipe(response);
  }

  getFileSharesWithMetadata(ownerEmail: string): Observable<FileShareWithMetadata[]> {
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
            let fileShareWithMetadata = new FileShareWithMetadata();
            fileShareWithMetadata.recipientEmail = fileShareWithMetadataResponse.recipientEmail;
            fileShareWithMetadata.recipientUsername = fileShareWithMetadataResponse.recipientUsername;
            fileShareWithMetadata.shareTimestamp = fileShareWithMetadataResponse.shareTimestamp;
            fileShareWithMetadata.fileMetadata = fileShareWithMetadataResponse.fileMetadataResponse;
            return fileShareWithMetadata;
          });
      }));
  }
}
