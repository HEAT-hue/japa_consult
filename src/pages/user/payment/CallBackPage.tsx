// jshint esversion:6
import { Modal } from "@/components/global";
import { useNavigate } from "react-router-dom";
import { PaymentNotification } from "@/components/user/payments";
import { PAYMENT_STATUS } from "@/data/admin/dashboard";

export const CallBackPage: React.FC = () => {
    // GET Navigator
    const navigate = useNavigate();

    const queryParameters = new URLSearchParams(window.location.search)

    // Fetch query parameters
    const status = queryParameters.get("status");
    // const ref_id = queryParameters.get("tx_ref");

    if (status == PAYMENT_STATUS.COMPLETED) {
        return (
            <Modal closeModal={() => navigate("/invoice")}>
                <PaymentNotification buttonTitle="Close" action={() => navigate("/invoice")} />
            </Modal>
        )
    }

    if (status == PAYMENT_STATUS.CANCELLED) {
        return (
            <Modal closeModal={() => navigate("/invoice")}>
                <PaymentNotification error errorMessage="You cancelled your payment" buttonTitle="Close" action={() => navigate("/invoice")} />
            </Modal>
        )
    }

    if (status == PAYMENT_STATUS.FAILED) {
        return (
            <Modal closeModal={() => navigate("/invoice")}>
                <PaymentNotification error errorMessage="Your payment was not successful." buttonTitle="Close" action={() => navigate("/invoice")} />
            </Modal>
        )
    }

    return (
        <>
            <p>This is the call back page</p>
        </>
    )
}