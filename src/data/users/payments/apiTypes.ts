export type BankTransferPaymentRequest = {
    invoiceId: string
}

export type BankTransferPaymentResponse = {
    "ref_id": string,
    "bank_name": string,
    "bank_account": string,
    "expires_in": number,
    "message": string
}

export type VerifyBankPaymentRequest = {
    refId: string
}

export type VerifyBankPaymentResponse = {
    "msg": string,
    "transactionComplete": boolean
}