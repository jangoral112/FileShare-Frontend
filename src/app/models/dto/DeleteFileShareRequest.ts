export class DeleteFileShareRequest {

  constructor(
    public fileKey: string,
    public recipientEmail: string
  ) {}

}
