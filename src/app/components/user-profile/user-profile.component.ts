import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserDetails} from '../../models/UserDetails';
import {FileTableComponent} from '../files/file-table/file-table.component';
import {FileService} from '../../services/file.service';
import {SessionStorageService} from '../../services/session-storage.service';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, AfterViewInit {

  editUsersAuthoritiesForm: FormGroup

  @ViewChild(FileTableComponent)
  fileTable: FileTableComponent;

  userDetails: UserDetails;

  constructor(private route: ActivatedRoute, private userService: UserService,
              private fileService: FileService, private sessionStorageService: SessionStorageService,
              private authService: AuthService, private toastr: ToastrService,
              private router: Router, private formBuilder: FormBuilder,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const email = params['email'];
        this.userService.getUserData(email).subscribe(
          userDetails => {
            this.userDetails = userDetails;
          });
      }
    );
  }

  ngAfterViewInit(): void {
    this.fileTable.setFilesMetadata(this.fileService.getFilesMetadata(this.userDetails.email, false));
  }

  public isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  onDeleteUser() {
    this.userService.deleteUser(this.userDetails.email).subscribe(
      next => {
        this.toastr.success(next);
        this.router.navigate(['admin-panel']);
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }

  openEditAuthoritiesFormModal(editAuthoritiesFormModal) {
    this.userService.getUserRoles(this.userDetails.email).subscribe(
      next => {
        this.editUsersAuthoritiesForm = this.formBuilder.group( {
          adminRole: [next.indexOf("ROLE_ADMIN") > -1]
        });

        this.modalService.open(editAuthoritiesFormModal, {size: 'sm'});
      }
    );
  }

  onEdit() {

    let roles = ["ROLE_USER"]

    if(this.editUsersAuthoritiesForm.get('adminRole').value == true) {
      roles.push('ROLE_ADMIN')
    }

    this.userService.patchUserRoles(this.userDetails.email, roles).subscribe(
      next => {
        this.toastr.success("Successfully edited user's authorities");
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }
}
