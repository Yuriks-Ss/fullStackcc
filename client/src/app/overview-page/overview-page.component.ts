import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AnalyticsService} from '../shared/services/analytics.service';
import {Observable} from "rxjs";
import {OverviewPage} from '../shared/interfaces';
import {MaterialInstence, MaterialService} from '../shared/classes/material.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tapTarget') tabTargetRef: ElementRef
  tapTarget: MaterialInstence
  data$: Observable<OverviewPage>

  yesterday = new Date()

  constructor(private service: AnalyticsService) { }

  ngOnInit(): void {
    this.data$ = this.service.getOverview()

    this.yesterday.setDate(this.yesterday.getDate() - 1)
  }
  ngOnDestroy() {
    this.tapTarget.destroy()
  }

  ngAfterViewInit() {
    this.tapTarget = MaterialService.initTapTarget(this.tabTargetRef)
  }

  openinfo() {
    this.tapTarget.open()
  }
}
