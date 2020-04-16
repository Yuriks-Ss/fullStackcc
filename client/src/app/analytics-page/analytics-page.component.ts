import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AnalyticsService} from '../shared/services/analytics.service';
import {AnaliticsPage} from '../shared/interfaces';
import {Subscription} from "rxjs";
import {Chart} from 'chart.js'

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('gain') gainRef: ElementRef
  @ViewChild('order') orderRef: ElementRef

  aSub: Subscription
  average: number
  pending = true

  constructor(private service: AnalyticsService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {}
  //
  //   const gainConfig: any = {
  //     label: 'receipts',
  //     color: 'rgb(255, 99, 132)'
  //   }
  //
  //   this.aSub = this.service.getAnalytics().subscribe((data: AnaliticsPage) => {
  //     this.average = data.average
  //
  //     gainConfig.labels = data.chart.map(item => item.label)
  //     gainConfig.data = data.chart.map(item => item.gain)
  //
  //     const gainCts = this.gainRef.nativeElement.getCotex('2d')
  //
  //     gainCts.canvas.height = '300px'
  //
  //     new Chart(gainCts, createChartConfig(gainCts))
  //
  //     this.pending = false
  //   })
  // }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

}

//
// function createChartConfig({labels, data, label, color}) {
//   return {
//     type: 'line',
//     responsive: true
//   }
//   data: {
//     labels
//     datasets: [
//       {
//         label, data,
//         borderColor: color,
//         steppedLine: false,
//         fill: false
//       }
//     ]
//   }
// }
