export class Page<T> {
    meta: any;
    items: T[];
}

export class Meta {
    currentItemCount: number;
    itemsPerPage: number;
    startIndex: number;
    totalItems: number = 10;
    pageIndex: number;
    totalPages: number;
}
