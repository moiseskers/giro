import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { ChartModule, UIChart } from 'primeng/chart';
import { NgClass, NgForOf, NgIf, NgStyle } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { YearPickerComponent } from '../components/year-picker/year-picker.component';
import { ChartLegendItem } from '../objects/chart-legend-item';
import { NGXLogger } from 'ngx-logger';
import { DockModule } from 'primeng/dock';
import { FormsModule } from '@angular/forms';
import moment from 'moment';
import { BarChartEvent } from '../objects/bar-chart-event';
import { Button, ButtonDirective } from 'primeng/button';

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrl: './bar-chart.component.scss',
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
        FormsModule,
        ButtonDirective,
        Button,
    ],
})
export class BarChartComponent {
    @ViewChild(UIChart) chart: UIChart;
    legendItems: ChartLegendItem[] = [];

    @Input() info: string;
    @Input() styleClass: any;
    @Input() displayBackButton: boolean = false;
    @Input() data: any;
    @Input() yearAtual: any;
    year: any;

    display: boolean = false;

    options = {};

    @Output() optionsEvent = new EventEmitter<BarChartEvent>();
    @Output() yearEvent = new EventEmitter();
    @Output() backEvent = new EventEmitter<void>();

    hasLegendItems = false;
    displayLegends = [];

    constructor(private log: NGXLogger, private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this.year = this.yearAtual || new Date().getFullYear();
        this.setupChartOptions();
        this.display = true;
    }

    private setupChartOptions() {
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
                        datasetIndex: datasetIndex,
                    };

                    this.optionsEventHelper(out);
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
                    },
                },
            },
        };
    }

    ngDoCheck(): void {
        if (this.chart?.chart?.legend?.legendItems && !this.hasLegendItems) {
            this.log.info(this?.chart?.chart);
            this.legendItems = this.chart.chart.legend.legendItems;
            this.displayLegends = this.legendItems.map(() => true);
            this.hasLegendItems = true;
        }
    }

    click(i: number) {
        this.displayLegends[i] = !this.displayLegends[i];
        this.data = JSON.parse(JSON.stringify(this.data));
        this.data.datasets = this.data.datasets.filter((value, index) => {
            return this.displayLegends[index];
        });

        if (this.data.datasets.length === 0) {
            this.data.datasets.push({ data: [0] });
        }

        this.setupChartOptions();
    }

    onYearChange(newYear: any) {
        if (newYear && newYear !== this.year) {
            this.year = newYear;
            this.yearEvent.emit(this.year);
        } else if (!newYear) {
            this.year = moment().year();
            this.yearEvent.emit(this.year);
        }
        this.cdr.detectChanges();
    }

    private optionsEventHelper(barChartEvent: BarChartEvent) {
        this.optionsEvent.emit(barChartEvent);
    }

    back() {
        this.backEvent.emit();
    }
}
