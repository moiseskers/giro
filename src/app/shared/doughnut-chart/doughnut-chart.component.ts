import {ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ChartModule, UIChart} from 'primeng/chart';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {Ripple} from 'primeng/ripple';
import {YearPickerComponent} from '../components/year-picker/year-picker.component';
import {ChartLegendItem} from '../objects/chart-legend-item';
import {NGXLogger} from 'ngx-logger';
import {DockModule} from 'primeng/dock';
import {FormsModule} from '@angular/forms';
import moment from 'moment';
import {BarChartEvent} from '../objects/bar-chart-event';

@Component({
    selector: 'app-doughnut-chart',
    templateUrl: './doughnut-chart.component.html',
    styleUrl: './doughnut-chart.component.scss',
    standalone: true,
    imports: [
        ChartModule,
        NgForOf,
        Ripple,
        YearPickerComponent,
        NgStyle,
        NgClass,
        NgIf,
        DockModule,
        FormsModule
    ]
})
export class DoughnutChartComponent {

    @ViewChild(UIChart) chart: UIChart;
    legendItems: ChartLegendItem[] = [];

    @Input() info: string;

    @Input() title: string;

    @Input()
    styleClass: any;

    options: any;

    @Input()
    data: any;

    display: boolean = false;
    hasLegendItems = false;
    displayLegends = [];

    @Output()  optionsEvent = new EventEmitter<BarChartEvent>();
    @Output()  yearEvent = new EventEmitter();

    year: any = moment().year();

    constructor(private log: NGXLogger, private changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.options = {
            onClick: (evt, element) => {
                if (element.length > 0) {
                    const firstElement = element[0];
                    const datasetIndex = firstElement.datasetIndex;
                    const index = firstElement.index;
                    const value = this.data.datasets[datasetIndex].data[index];


                    const out = {
                        index: index,
                        value: value,
                        datasetIndex: datasetIndex
                    };

                    this.optionsEventHelper(out)

                }
            },
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                htmlLegend: {
                    containerID: 'legend-container',
                },
                legend: {
                    position: 'top',
                    align: 'start',
                    display: false,
                    labels: {
                        color: textColor,
                    }
                }
            },
        };

        setTimeout(() => {
            this.display = true
            this.changeDetectorRef.detectChanges()

        }, 300)

    }

    ngDoCheck(): void {
        if (this?.chart?.chart && !this.hasLegendItems) {
            this.log.info(this?.chart?.chart);
            this.legendItems = this?.chart?.chart?.legend?.legendItems;
            this.displayLegends = this.legendItems?.map(value => true);
            this.hasLegendItems = true;
        }
    }

    click(i: number) {
        this.displayLegends[i] = !this.displayLegends[i];
        this.data = JSON.parse(JSON.stringify(this.data));
        this.data.datasets = this.data.datasets.filter((value, index) => {
            return this.displayLegends[index]
        });

        if (this.data.datasets.length === 0) {
            this.data.datasets.push(
                {data: [0]}
            )
        }

        this.log.info(this.data.datasets);

        this.ngOnInit();
    }


    onYearChange(newYear: any) {
        if (newYear !== this.year) {
            this.year = newYear;  // This line ensures the year is updated in the component
            this.yearEvent.emit(newYear);  // Emit event only if needed
        } else {
            this.year = newYear;
        }
    }

    private optionsEventHelper(barChartEvent: BarChartEvent) {
        this.optionsEvent.emit(barChartEvent)
        // this.display = false;
        // this.changeDetectorRef.detectChanges()
        // setTimeout(() => {
        //     this.ngOnInit()
        // }, 1000)
    }
}
