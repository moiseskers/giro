
export class AddItemIfConditionHelper {

    // // do not forget to use ...addItemIfConditionHelper, or flat()
    // public static execute(condition: boolean, item: any) {
    //     return condition ? [item] : [];
    // }

    public static execute(condition: boolean, ...items: any[]) {
        return condition ? items : [];
    }

}
