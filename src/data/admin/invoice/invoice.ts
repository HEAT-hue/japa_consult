import { PAYMENT_STATUS } from "../dashboard"

export type PaymentActivityType = {
    name: string,
    invoiceID: string,
    amount: string,
    status: PAYMENT_STATUS,
    date: string
}

export type PaidInvoiceType = {
    "inv_id": string,
    "title": string,
    "desc": string,
    "price": number,
    "to_email": string,
    "created_at": Date,
    "created_by": Date,
    "updated_at": Date,
    "updated_by": string,
    "due_date": Date,
    "paid": boolean,
    "paid_at": Date
}

type PaymentStatusInterface = {
    [key: string]: {
        color: string;
        backgroundColor: string;
    };
}

// Styles for the Debit Status category
export const PaymentStatusColor: PaymentStatusInterface = {
    completed: {
        color: "#68EE76",
        backgroundColor: "#68EE764D",
    },
    pending: {
        color: "#FFC727",
        backgroundColor: "#FFC7274D",
    },
    canceled: {
        color: "#FF4848",
        backgroundColor: "#FF48484D",
    },
};
