import { Component, OnInit } from '@angular/core';
import {FileService} from '../../services/file.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SessionStorageService} from '../../services/session-storage.service';
import {FileUploadMetadata} from '../../models/FileUploadMetadata';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  fileUploadForm: FormGroup;

  file: File;

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder,
              private fileService: FileService, private sessionStorageService: SessionStorageService,
              private router: Router) {}

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      file: [null],
      fileName: [null],
      fileDescription: [null],
      publicFileFlag: [false],
      ownerEmail: [null]
    });
    this.fileUploadForm.get('ownerEmail').setValue(this.sessionStorageService.getEmail());
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
    if(this.file) {
     this.fileUploadForm.patchValue( {
         fileName: this.file.name,
       })
    }
  }

  onSubmit() {
    let fileUploadMetaData = new FileUploadMetadata();
    fileUploadMetaData.fileName = this.fileName;
    fileUploadMetaData.fileDescription = this.fileDescription;
    fileUploadMetaData.ownerEmail = this.ownerEmail;
    fileUploadMetaData.publicFileFlag = this.publicFileFlag;

    this.fileService.upload(this.file, fileUploadMetaData).subscribe(
      response => {
        console.log(response);
        this.toastr.success(response.body, "Success");
        this.router.navigate([{outlets: {primary: 'file-dashboard'}}]);
      },
      error => {
        console.log(error);
        this.toastr.error(error.error.message, error.status);
      }
    );
  }

  get fileName() {
    return this.fileUploadForm.get('fileName').value;
  }

  get fileDescription() {
    return this.fileUploadForm.get('fileDescription').value;
  }

  get publicFileFlag() {
    return this.fileUploadForm.get('publicFileFlag').value;
  }

  get ownerEmail() {
    return this.fileUploadForm.get('ownerEmail').value;
  }
}
