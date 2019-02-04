import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {
    const data = this.route.snapshot.data['lang'];
    if (data && data['lang'] === 'en') {
      this.translate.setDefaultLang('en');
    } else {
      this.translate.setDefaultLang('mm');
    }
  }
  ngOnInit() {
  }
}
