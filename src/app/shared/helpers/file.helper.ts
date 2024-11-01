export class FileHelper {

    public static isTheSameFiles(file: File, currentFilesValue: File[]): boolean {
        try {
            currentFilesValue.forEach((element) => {
                if ( FileHelper.isFileSame(element, file)) throw Error('Files are the same!');
            });
        } catch (e) {
            return true;
        }
        return false;
    }


    public static isFileSame(file1: File, file2: File): boolean {
        return (
            file1.name === file2.name &&
            file1.size === file2.size &&
            file1.type === file2.type
        );
    }

    public static toBase64(file: File): Promise<string> {
        const reader = new FileReader();
        return new Promise(resolve => {
            reader.onload = () => {
                const base64String = reader.result as string;
                resolve(base64String);
            };
            reader.readAsDataURL(file);
        });
    }

    public static cleanBase64String(input: string): string {
        const base64Pattern = /^[A-Za-z0-9+/=]+$/;
        const base64Content = input.replace(/^data:[\w\/]+;base64,/, '');
        return base64Content.split('').filter(char => base64Pattern.test(char)).join('');
    }

}
