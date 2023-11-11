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

export type CardPaymentRequest = {
    params: {
        invoiceId: string
    },
    body: {
        "cardno": string,
        "cvv": string,
        "expirymonth": string,
        "expiryyear": string,
        "pin": string
    }
}

export type CardPaymentResponse = {
    "ref_id": string,
    "validationRequired": boolean
}

export type VerifyCardPaymentRequest = {
    otp: string,
    "ref_id": string,
}

export type VerifyCardPaymentResponse = {
    "transactionComplete": true,
    "ref_id": "string",
    "inv_id": "string",
    "amount": 0,
    "chargedamount": 0,
    "currency": "string"
}
