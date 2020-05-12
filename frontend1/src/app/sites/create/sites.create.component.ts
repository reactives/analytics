import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { SiteService } from '@app/_services';

@Component({ templateUrl: 'sites.create.component.html' })
export class SitesCreateComponent implements OnInit {
  siteForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private siteService: SiteService
  ) {

  }

  ngOnInit() {
    this.siteForm = this.formBuilder.group({
      host: ['', Validators.required],
      siteName: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.siteForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.siteForm.invalid) {
      return;
    }

    this.loading = true;
    this.siteService.create(this.f.host.value, this.f.siteName.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.router.navigate(['/sites/',data._id]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
