import {FileShareWithMetadataResponse} from './dto/FileShareWithMetadataResponse';
import {FileMetadata} from './FileMetadata';

export class FileShareWithMetadata {

  constructor(
    public recipientEmail:string,
    public recipientUsername: string,
    public shareTimestamp: Date,
    public fileMetadata: FileMetadata
  ) {}

}
