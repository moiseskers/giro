export class FindCommentElementInTwoArraysHelper {
    public static get(array1: any[], array2: any[]): boolean {
        for (let i = 0; i < array1.length; i++) {
            for (let j = 0; j < array2.length; j++) {
                if (array1[i] === array2[j]) {
                    return true;
                }
            }
        }
        return false;
    }
}
