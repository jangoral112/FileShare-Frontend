import { Component, OnInit } from '@angular/core';
import {FileMetadata} from '../../../models/FileMetadata';
import {FileService} from '../../../services/file.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.css']
})
export class FileDetailsComponent implements OnInit {

  constructor(private fileService: FileService, private route: ActivatedRoute,
              private router: Router, private toastr: ToastrService) { }

  fileMetaData: FileMetadata;

  ngOnInit(): void {
    if(history.state.data == undefined) {
      this.route.params.subscribe(
      params => {
            const key = params['key'];
            this.fileService.getFileMetaDataByKey(key).subscribe(
            fileMetaData => {
                  this.fileMetaData = fileMetaData;
                });
           }
      );
    } else {
      this.fileMetaData = history.state.data;
    }
  }

  onDownload() {
    this.fileService.downloadFile(this.fileMetaData.fileKey).subscribe(
      response => {
            let url = window.URL.createObjectURL(response.body);
            let anchor = document.createElement('a');
            anchor.download = this.fileMetaData.fileName;
            anchor.href = url;
            anchor.click();
          },
      response => {
            this.toastr.error(response.error.message, response.status);
          }
    );
  }

  onDelete() {
    this.fileService.deleteFile(this.fileMetaData.fileKey).subscribe(
      response => {
        this.toastr.success(response.body, "Success, file deleted");
        this.router.navigate([{outlets: {primary: 'files-dashboard'}}]);
      },
      response => {
        this.toastr.error(response.error.message, response.status);
      }
    );
  }

}
