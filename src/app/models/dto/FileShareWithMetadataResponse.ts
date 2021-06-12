import {FileMetadata} from '../FileMetadata';

export class FileShareWithMetadataResponse {

  recipientEmail: string;

  recipientUsername: string;

  shareTimestamp: Date;

  fileMetadataResponse: FileMetadata;
}
