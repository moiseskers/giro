export class CssHelper {

    public static rgbToHex(r: number, g: number, b: number): string {
        return '0x' + [r, g, b].map(x => {
            return x.toString(16).padStart(2, '0');
        }).join('');
    }

    public static cssVariableAsHash(variableName: string): string | null {
        return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
    }

    public static cssVariableAsHex(variableName: string): number | null {
        const color = CssHelper.cssVariableAsHash(variableName);

        if (color.startsWith('rgb')) {
            const rgbValues = color.match(/\d+/g)?.map(Number) as [number, number, number];
            if (rgbValues && rgbValues.length === 3) {
                return Number(CssHelper.rgbToHex(rgbValues[0], rgbValues[1], rgbValues[2]));
            }
        }

        if (color.startsWith('#')) {
            const hex = color.slice(1);
            const stringHex = '0x' + (hex.length === 6 ? hex : hex + hex);
            return Number(stringHex);
        }

        console.warn('Unsupported color format:', color);
        return null;
    }



}
