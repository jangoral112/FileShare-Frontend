import { Component, OnInit } from '@angular/core';
import {FileMetadata} from '../../../models/FileMetadata';
import {FileService} from '../../../services/file.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SessionStorageService} from '../../../services/session-storage.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FileShareService} from '../../../services/file-share.service';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.css']
})
export class FileDetailsComponent implements OnInit {

  fileMetadata: FileMetadata;

  fileShareForm: FormGroup;

  constructor(private fileService: FileService, private route: ActivatedRoute,
              private router: Router, private toastr: ToastrService,
              private sessionStorageService: SessionStorageService, private modalService: NgbModal,
              private formBuilder: FormBuilder, private fileShareService: FileShareService) { }

  ngOnInit(): void {
    if(history.state.data == undefined) {
      this.route.params.subscribe(
      params => {
            const key = params['key'];
            this.fileService.getFileMetaDataByKey(key).subscribe(
            fileMetaData => {
                  this.fileMetadata = fileMetaData;
                });
           }
      );
    } else {
      this.fileMetadata = history.state.data;
    }
  }

  isFileOwner(): boolean {
    return this.fileMetadata.ownerEmail == this.sessionStorageService.getEmail();
  }

  onDownload() {
    this.fileService.downloadFile(this.fileMetadata.fileKey).subscribe(
      response => {
            let url = window.URL.createObjectURL(response.body);
            let anchor = document.createElement('a');
            anchor.download = this.fileMetadata.fileName;
            anchor.href = url;
            anchor.click();
          },
      response => {
            this.toastr.error(response.error.message, response.status);
          }
    );
  }

  onDelete() {
    this.fileService.deleteFile(this.fileMetadata.fileKey).subscribe(
      response => {
        this.toastr.success(response.body, "Success, file deleted");
        this.router.navigate([{outlets: {primary: 'files-dashboard'}}]);
      },
      response => {
        this.toastr.error(response.error.message, response.status);
      }
    );
  }

  openShareFormModal(shareForm) {
    this.fileShareForm = this.formBuilder.group( {
      recipientEmail: [null]
    });
    this.modalService.open(shareForm, {size: 'sm'});
  }

  onShare() {
    this.fileShareService.postFileShare(
      this.sessionStorageService.getEmail(),
      this.recipientEmail,
      this.fileMetadata.fileKey
    ).subscribe(
      next => {
        this.toastr.success(next.body, "Success");
        this.modalService.dismissAll()
      },
      error => {
        console.log(error)
        this.toastr.error("Failed to share file", "Error");
      }
    );
  }

  get recipientEmail() {
    return this.fileShareForm.get('recipientEmail').value;
  }
}
