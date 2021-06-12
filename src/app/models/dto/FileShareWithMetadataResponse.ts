import {FileMetadata} from '../FileMetadata';

export class FileShareWithMetadataResponse {

  recipientEmail: string;

  recipientName: string;

  shareTimestamp: Date;

  fileMetadata: FileMetadata;
}
