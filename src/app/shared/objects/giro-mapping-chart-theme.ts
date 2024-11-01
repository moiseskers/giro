import {Theme} from '@amcharts/amcharts5/.internal/core/Theme';
import {CssHelper} from '../helpers/css.helper';
import {Color} from '@amcharts/amcharts5/.internal/core/util/Color';

export class GiroMappingChartTheme extends Theme {
    override setupDefaultRules() {
        super.setupDefaultRules();

        const primaryColor = CssHelper.cssVariableAsHex('--primary-color');
        const neutral = CssHelper.cssVariableAsHex('--neutral-100');

        this.rule("ColorSet").setAll({
            colors: [
                Color.fromHex(0xFF0000), // Red
                Color.fromHex(0x00FF00), // Lime
                Color.fromHex(0x0000FF), // Blue
                Color.fromHex(0xFFFF00), // Yellow
                Color.fromHex(0x00FFFF), // Aqua
                Color.fromHex(0xFF00FF), // Fuchsia
                Color.fromHex(0xC0C0C0), // Silver
                Color.fromHex(0x808080), // Gray
                Color.fromHex(0x800000), // Maroon
                Color.fromHex(0x808000), // Olive
                Color.fromHex(0x008000), // Green
                Color.fromHex(0x800080), // Purple
                Color.fromHex(0x008080), // Teal
                Color.fromHex(0xF08080), // LightCoral
                Color.fromHex(0xFFD700), // Gold
                Color.fromHex(0xFF4500), // OrangeRed
                Color.fromHex(0x2F4F4F), // DarkSlateGray
                Color.fromHex(0xD3D3D3), // LightGray
                Color.fromHex(0xA9A9A9)  // DarkGray
            ],
            reuse: true
        });

        this.rule("InterfaceColors").setAll({

            stroke: Color.fromHex(0x000000), // White color for stroke
            fill: Color.fromHex(0x000000), // Primary color for fill
            primaryButton: Color.lighten(Color.fromHex(neutral), -0.2), // Lightened beige for primary button
            primaryButtonHover: Color.lighten(Color.fromHex(0x000000), -0.2), // Lightened blue for primary button hover
            primaryButtonDown: Color.lighten(Color.fromHex(0x68dc75), -0.2), // Lightened green for primary button pressed
            primaryButtonActive: Color.lighten(Color.fromHex(0x68dc76), -0.2), // Lightened green for primary button active
            primaryButtonText: Color.fromHex(0x11120F), // Dark color for primary button text
            primaryButtonStroke: Color.lighten(Color.fromHex(0x000000), -0.2), // Lightened beige for primary button stroke

            secondaryButton: Color.fromHex(0x000000), // Light grey color for secondary button
            secondaryButtonHover: Color.lighten(Color.fromHex(0x000000), 0.1), // Lightened grey for secondary button hover
            secondaryButtonDown: Color.lighten(Color.fromHex(0x000000), 0.15), // Further lightened grey for secondary button pressed
            secondaryButtonActive: Color.lighten(Color.fromHex(0x000000), 0.2), // Even further lightened grey for secondary button active
            secondaryButtonText: Color.fromHex(0x000000), // Dark color for secondary button text
            secondaryButtonStroke: Color.lighten(Color.fromHex(0x000000), -0.2), // Lightened grey for secondary button stroke

            grid: Color.fromHex(0xd8ded4), // Dark color for grid lines
            background: Color.fromHex(0xffffff), // White color for background
            alternativeBackground: Color.fromHex(0xffffff), // Alternative white background
            text: Color.fromHex(0x000000), // Black color for text
            alternativeText: Color.fromHex(0x000000), // White color for alternative text
            disabled: Color.fromHex(0x000000), // Grey color for disabled elements
            positive: Color.fromHex(0x000000), // Green color for positive indicators
            negative: Color.fromHex(0xb30000) // Red color for negative indicators
        })
    }

}
