import { Component, Input, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { PricePipePipe } from '../../core/customPipe/price-pipe.pipe';
import * as Highcharts from 'highcharts';
import Accessibility from 'highcharts/modules/accessibility';
import { CommonModule } from '@angular/common';
import { ThemeService, Theme } from '../../core/services/theme.service';
import { Subscription } from 'rxjs';

Accessibility(Highcharts)
@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [HighchartsChartModule, PricePipePipe, CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnChanges, OnInit, OnDestroy {
  @Input() chartData: any
  @Input() chartName: any
  @Input() chartType: any
  @Input() interval: any
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {}
  updateFromInput: boolean = true
  objFromInput: any = {}
  currentTheme: Theme = 'light';
  private themeSubscription?: Subscription;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.currentTheme = this.themeService.currentTheme;
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
      // Re-render charts when theme changes
      if (this.chartData) {
        if (this.chartName === 'newPaid') {
          this.setChartVariableForPaidSubTrend();
        } else if (this.chartName === 'trial') {
          this.setChartVariableForTrial();
        } else if (this.chartName === 'mrr-report') {
          this.setChartVariableForMrr();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
  }

  getThemeStyles() {
    const isDark = this.currentTheme === 'dark';
    return {
      backgroundColor: isDark ? '#1a1b23' : '#ffffff',
      textColor: isDark ? '#e5e7eb' : '#1f2937',
      gridLineColor: isDark ? '#374151' : '#e5e7eb',
      lineColor: isDark ? '#4b5563' : '#d1d5db',
      subtitleColor: isDark ? '#d1d5db' : '#6b7280',
      titleColor: isDark ? '#f3f4f6' : '#111827'
    };
  }

  setOptions() {
    this.objFromInput['credits'] = { enabled: false }
    this.objFromInput['chart'] = { type: this.chartType, plotShadow: false, plotBorderWidth: 0, plotBackgroundColor: '', height: 250 }
    this.objFromInput['title'] = { text: '' };
    this.objFromInput['tooltip'] = { pointFormat: '<b>{point.name}</b>: {point.y}', outside: true };
    this.objFromInput['series'] = [
      {
        data: [
          {
            name: "subcriptions",
            y: this.chartData.totalSub
          },
          {
            name: "customers",
            y: this.chartData.totalUsers
          }
        ]
      }
    ]
    this.objFromInput['plotOptions'] = {
      series: {
        dataLabels: [{ enabled: false }],
        cursor: 'pointer',
        showInLegend: true
      },
      pie: {
        innerSize: '80%'
      }
    }
    this.objFromInput['colors'] = ['#4B49AC', '#f33a3a']
    this.chartOptions = this.objFromInput
    Highcharts.chart('riskyCustomerChart', this.chartOptions)
    this.updateFromInput = true
  }

  setChartVariableForPaidSubTrend() {
    const themeStyles = this.getThemeStyles();
    const objFromInput: any = {}
    objFromInput['credits'] = false
    objFromInput['chart'] = { 
      type: this.chartType,
      backgroundColor: themeStyles.backgroundColor
    };
    objFromInput['legend'] = { 
      align: 'center', 
      verticalAlign: 'top', 
      lineHeight: 0, 
      padding: 0,
      itemStyle: { color: themeStyles.textColor }
    };
    objFromInput['title'] = { text: '', style: { color: themeStyles.titleColor } };
    objFromInput['subtitle'] = { 
      text: `<b>New VS Churn Subscription</b>`,
      style: { color: themeStyles.subtitleColor }
    };
    objFromInput['yAxis'] = {
      title: {
        text: 'Amount',
        style: { color: themeStyles.textColor }
      },
      labels: {
        style: { color: themeStyles.textColor }
      },
      gridLineColor: themeStyles.gridLineColor,
      lineColor: themeStyles.lineColor
    };

    objFromInput['xAxis'] = {
      type: 'datetime',
      title: {
        text: '',
        style: { color: themeStyles.textColor }
      },
      labels: {
        format: this.interval === 'month' ? '{value: %b %Y}' : this.interval === 'year' ? '{value: %Y}' : '{value:%e %b %Y}',
        style: { color: themeStyles.textColor }
      },
      tickPositioner: function () {
        return this.series[0].xData;
      },
      lineColor: themeStyles.lineColor,
      tickColor: themeStyles.lineColor
    };
    objFromInput['plotOptions'] = {
      series: {
        borderRadius: 3
      }
    };
    objFromInput['tooltip'] = {
      backgroundColor: themeStyles.backgroundColor,
      borderColor: themeStyles.lineColor,
      style: { color: themeStyles.textColor },
      formatter: function () {
        const formattedDate = Highcharts.dateFormat('%e %b, %Y', this.x)
        const point = this.point; // Extract the point data
        return `<b>${point.series.name}</b><br/><b>No Of Users : </b>${point.noOfUsers}<br/><b>No Of Sub : </b>${point.noOfSub}<br/><b>Value : </b>${point.y.toLocaleString('en-IN', { maximumFractionDigits: 0 })} <br/><b>date : </b>${formattedDate}`;
      }
    };
    objFromInput['series'] = [
      {
        name: 'New Paid Subscription',
        data: this.chartData?.newPaidSubData.map((data: any) => {
          const x = data[0];
          const noOfSub = data[1].toLocaleString('en-IN', { maximumFractionDigits: 0 })
          const noOfUsers = data[2].toLocaleString('en-IN', { maximumFractionDigits: 0 })
          const y = data[3];
          return {
            x,
            y,
            noOfSub,
            noOfUsers
          };
        }),
      },
      {
        name: 'Churn Subscription',
        data: this.chartData?.churnSubData.map((data: any) => {
          const x = data[0];
          const noOfSub = data[1].toLocaleString('en-IN', { maximumFractionDigits: 0 })
          const noOfUsers = data[2].toLocaleString('en-IN', { maximumFractionDigits: 0 })
          const y = data[3];
          return {
            x,
            y,
            noOfSub,
            noOfUsers
          };
        }),
      },
    ];
    this.chartOptions = objFromInput
    Highcharts.chart('paidSubTrendChart', this.chartOptions)
    this.updateFromInput = true
  }

  setChartVariableForTrial() {
    const themeStyles = this.getThemeStyles();
    const objFromInput: any = {}
    objFromInput['credits'] = false
    objFromInput['chart'] = { 
      type: this.chartType,
      backgroundColor: themeStyles.backgroundColor
    };
    objFromInput['legend'] = { 
      align: 'center', 
      verticalAlign: 'top', 
      lineHeight: 0, 
      padding: 0,
      itemStyle: { color: themeStyles.textColor }
    };
    objFromInput['title'] = { text: '', style: { color: themeStyles.titleColor } };
    objFromInput['subtitle'] = { 
      text: `<b>Trial Summary Trend<b/>`,
      style: { color: themeStyles.subtitleColor }
    };
    objFromInput['yAxis'] = {
      title: {
        text: 'No Of Subscriptions',
        style: { color: themeStyles.textColor }
      },
      labels: {
        style: { color: themeStyles.textColor }
      },
      gridLineColor: themeStyles.gridLineColor,
      lineColor: themeStyles.lineColor
    };

    objFromInput['xAxis'] = {
      type: 'datetime',
      labels: {
        format: this.interval === 'month' ? '{value: %b %Y}' : this.interval === 'year' ? '{value: %Y}' : '{value:%e %b %Y}',
        style: { color: themeStyles.textColor }
      },
      tickPositioner: function () {
        return this.series[0].xData;
      },
      lineColor: themeStyles.lineColor,
      tickColor: themeStyles.lineColor
    };

    objFromInput['tooltip'] = {
      backgroundColor: themeStyles.backgroundColor,
      borderColor: themeStyles.lineColor,
      style: { color: themeStyles.textColor },
      formatter: function () {
        const formattedDate = Highcharts.dateFormat('%e %b, %Y', this.x)
        const point = this.point; // Extract the point data
        return `<b>${point.series.name}</b><br/><b>No Of Users :</b> ${point.noOfUsers}<br/><b>No Of Sub :</b> ${point.y.toLocaleString('en-IN', { maximumFractionDigits: 0 })}<br/><b>Value :</b> ${point.amount} <br/><b>date :</b> ${formattedDate}`;
      }
    };
    objFromInput['plotOptions'] = {
      series: {
        borderRadius: 3
      }
    };
      objFromInput['series'] = [
        {
          name: 'Trial Signups',
          data: this.chartData?.totalTrialSubData.map((data: any) => {
            const x = data[0];
            const y = data[1];
            const noOfUsers = data[2].toLocaleString('en-IN', { maximumFractionDigits: 0 })
            const amount = data[3].toLocaleString('en-IN', { maximumFractionDigits: 0 })
            return {
              x,
              y,
              amount,
              noOfUsers
            };
          }),
        },
        {
          name: 'Trial Expired',
          data: this.chartData?.expiredSubData.map((data: any) => {
            const x = data[0];
            const y = data[1];
            const noOfUsers = data[2].toLocaleString('en-IN', { maximumFractionDigits: 0 })
            const amount = data[3].toLocaleString('en-IN', { maximumFractionDigits: 0 })
            return {
              x,
              y,
              amount,
              noOfUsers
            };
          }),
        },
        {
          name: 'Trial To Paid',
          data: this.chartData?.trialToPaidSubData.map((data: any) => {
            const x = data[0];
            const y = data[1];
            const noOfUsers = data[2].toLocaleString('en-IN', { maximumFractionDigits: 0 })
            const amount = data[3].toLocaleString('en-IN', { maximumFractionDigits: 0 })
            return {
              x,
              y,
              amount,
              noOfUsers
            };
          }),
        },
      ];
    objFromInput['colors'] = ['#4B49AC', '#E0E0E0', '#64ABFF']
    this.chartOptions = objFromInput
    Highcharts.chart('trialReportChart', this.chartOptions)
    this.updateFromInput = true
  }

  setChartVariableForMrr() {
    const themeStyles = this.getThemeStyles();
    const objFromInput: any = {};
    objFromInput['credits'] = false;
    objFromInput['chart'] = { 
      type: this.chartType,
      backgroundColor: themeStyles.backgroundColor,
      plotBackgroundColor: themeStyles.backgroundColor
    };
    objFromInput['legend'] = { 
      align: 'center', 
      verticalAlign: 'top', 
      lineHeight: 0, 
      padding: 0,
      itemStyle: { color: themeStyles.textColor }
    };
    objFromInput['title'] = { text: '', style: { color: themeStyles.titleColor } };
    objFromInput['subtitle'] = { 
      text: `<b>Monthly Revenue Report<b/>`,
      style: { color: themeStyles.subtitleColor }
    };
    objFromInput['yAxis'] = {
      title: {
        text: 'MRR values',
        style: { color: themeStyles.textColor }
      },
      labels: {
        style: { color: themeStyles.textColor }
      },
      gridLineColor: themeStyles.gridLineColor,
      lineColor: themeStyles.lineColor
    };

    objFromInput['xAxis'] = {
      type: 'datetime',
      title: {
        text: 'Months',
        style: { color: themeStyles.textColor }
      },
      labels: {
        format: '{value: %b %Y}',
        style: { color: themeStyles.textColor }
      },
      tickPositioner: function () {
        return this.series[0].xData;
      },
      lineColor: themeStyles.lineColor,
      tickColor: themeStyles.lineColor
    };

    objFromInput['tooltip'] = {
      backgroundColor: themeStyles.backgroundColor,
      borderColor: themeStyles.lineColor,
      style: { color: themeStyles.textColor },
      formatter: function (): string {
        const point = this.point;
        return `<br/><b>Month :</b> ${point.month}<br/><b>MRR :</b> ${point.value}<br/> <b>Percentage :</b> ${point.changePercentage}%`;
      }
    };

    objFromInput['plotOptions'] = {
      series: {
        borderRadius: 3
      }
    };

    objFromInput['series'] = [
      {
        name: 'MRR',
        data: this.chartData.map((data: any) => {
          const x = Date.UTC(new Date(data.month).getFullYear(), new Date(data.month).getMonth(), 1);
          const y = data.value;
          return {
            x,
            y,
            month: data.month,
            value: data.value,
            changePercentage: data.changePercentage
          };
        }),
      }
    ];
    objFromInput['colors'] = ['#4B49AC'];
    this.chartOptions = objFromInput;
    Highcharts.chart('mrrReportChart', this.chartOptions);
    this.updateFromInput = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] && this.chartName == 'risky' && this.chartData) {
      this.setOptions()
    } else if ((changes['chartData'] || changes['chartType']) && this.chartData) {
      if (this.chartName == 'newPaid'  && this.chartData) {
        this.setChartVariableForPaidSubTrend()
      } else if (this.chartName == 'trial' && this.chartData) {
        this.setChartVariableForTrial()
      } else if (this.chartName == 'mrr-report' && this.chartData) {
        this.setChartVariableForMrr()
      }
    }
  }
}
