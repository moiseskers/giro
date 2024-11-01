// {...$event,

// this.filterHelper.page($event, async ($event: any) => {
//             this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.biddingId, $event)), this.loaderUserServiceGet);
//         });
export class FilterHistoryHelper {

    $event: any = {}
    displayPaginator: boolean = true;

    public filter($event: any, callback?: Function) {
        this.displayPaginator = false;
        if (callback) {
            callback($event);
            setTimeout(() => this.displayPaginator = true, 200);
        }
    }

    public page($event: any, callback?: Function) {
        this.$event = {...this.$event, ...$event}
        if (callback)
            callback(this.$event);
    }

    public sort($event: any, callback?: Function) {
        $event = this.getSortObject($event);
        this.$event = {...this.$event, ...$event}
        if (callback)
            callback(this.$event);
    }

    private getSortObject(input: any) {
        input = Array.isArray(input) ? input[0] : input;
        const direction = input?.order == 1 ? 'asc' : 'desc';
        return {
            sort:`${input.field}.${direction}`
        }
    }
}
