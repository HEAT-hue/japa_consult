export type MutationResultType = {
    success: boolean,
    message: string,
    data?: unknown
}

export enum INVOICE_NAVIGATION {
    ALL = 'ALL',
    PENDING = 'PENDING',
    PAID = 'PAID'
}