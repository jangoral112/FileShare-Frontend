import {FileShareWithMetadataResponse} from './dto/FileShareWithMetadataResponse';
import {FileMetadata} from './FileMetadata';

export class FileShareWithMetadata {

  recipientEmail: string;

  recipientUsername: string;

  shareTimestamp: Date;

  fileMetadata: FileMetadata;
}
