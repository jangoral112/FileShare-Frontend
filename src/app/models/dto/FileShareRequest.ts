export class FileShareRequest {

  constructor(
    public ownerEmail: string,
    public recipientEmail: string,
    public fileKey: string
  ) {}
}
