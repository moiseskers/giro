import {Component, EventEmitter, Input, Output} from '@angular/core';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import {default as data} from '../../../../../assets/documents/region_metropolitana_de_santiago.json';
import {GiroMappingChartTheme} from '../../../../shared/objects/giro-mapping-chart-theme';
import {CssHelper} from '../../../../shared/helpers/css.helper';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import {NGXLogger} from 'ngx-logger';

@Component({
    selector: 'app-operations-in-territory-map',
    standalone: true,
    templateUrl: './operations-in-territory-map.component.html',
    styleUrl: './operations-in-territory-map.component.scss'
})
export class OperationsInTerritoryMapComponent {

    @Input() data!: any;

    root!: am5.Root;
    polygonSeries: am5map.MapPolygonSeries;

    @Output() operationsInTerritoryEvent: EventEmitter<string> = new EventEmitter();

    constructor(private log: NGXLogger) {}

    async ngAfterViewInit() {

        setTimeout(() => {

            this.data = data;
            let root: am5.Root;

            root = am5.Root.new('chartdiv');

            // Set themes
            // root.setThemes([GiroMappingChartTheme.new(root)]);
            root.setThemes([am5themes_Animated.new(root), GiroMappingChartTheme.new(root)]);

            // root.setThemes([GiroMappingChartTheme.new(root)]);

            this.setMapValues(root);

            this.root = root;

            this.log.info('this.data ', this.data)

        }, 500);
    }

    setMapValues(root = this.root) {
        // Create chart
        const chart = root.container.children.push(
            am5map.MapChart.new(root, {
                panX: 'none',
                panY: 'none',
                wheelY: 'none',
            })
        );

        // Create polygon series
        const polygonSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: this.data,
                valueField: 'value',
                calculateAggregates: true,
            })
        );

        // Tooltip Text
        polygonSeries.mapPolygons.template.setAll({
            tooltipText: '{NOM_COM}',
        });

        const primaryColor = CssHelper.cssVariableAsHex('--primary-color');
        const primaryColor900 = CssHelper.cssVariableAsHex('--primary-900');
        const primaryLightColor = CssHelper.cssVariableAsHex('--primary-light-color');

        polygonSeries.set('heatRules', [
            {
                target: polygonSeries.mapPolygons.template,
                dataField: 'value',
                min: am5.color(primaryColor),
                max: am5.color(primaryColor),
                minValue: 0,
                maxValue: 100,
                key: 'fill',
            },
        ]);

        // Heat Legend
        // let heatLegend = chart.children.push(
        //   am5.HeatLegend.new(root, {
        //     orientation: 'horizontal',
        //     startColor: am5.color('#daf7e9'),
        //     endColor: am5.color('#26D07C'),
        //     startText: '0%',
        //     endText: '100%',
        //     position: 'absolute',
        //     width: 130,
        //     height: 32,
        //     x: 0,
        //     y: am5.percent(91)
        //   })
        // );


        // this.data.map(value => {
        //     id: value.id,
        //
        // })

        const polygonSeriesData = this.data.features
            .map(data => {
            return {
                id: data.id,
                value: data.value,
            }
        })

        this.log.info('polygonSeriesData ', polygonSeriesData);

        polygonSeries.data.setAll(polygonSeriesData);

        polygonSeries.events.on('pointerdown', (e) => {
            const id = e.target.dataItem.dataContext['id'];
            if (id) {
                const feature: any = this.data.features.filter((value: any) => value.id === id)[0];

                if (feature) {
                    this.operationsInTerritoryEvent.emit(feature?.properties);
                }
            } else {
                this.log.info('id is undefined, the event wont be emitted!');
            }
        });

        this.polygonSeries = polygonSeries;

        // styles
        root.dom.style.backgroundColor = "var(--surface-card)";

        root._logo.dispose();

        polygonSeries.mapPolygons.template.states.create("hover", {
            fill: am5.color(primaryLightColor)
        });
    }

}
