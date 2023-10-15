// jshint esversion:6
import { useSearchParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuthVerifyEmailTokenHook } from "@/hooks/global/auth";
import { LineLoader } from "@/components/global/loader";
import { useState } from "react";
import { Modal, Notification } from "@/components/global";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const VerifyUserEmailPage: React.FC = () => {

    // Get Navigator
    const navigate = useNavigate();

    // Get query parameters
    const [queryParameters] = useSearchParams();

    // Error modal
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    // Success modal
    const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);

    // Hook to verify email token
    const { authVerifyEmailToken, isLoading } = useAuthVerifyEmailTokenHook();

    // Get token
    const userToken = queryParameters.get("token");

    useEffect(() => {
        if (userToken == null || !userToken) {
            return;
        }

        (async function () {
            const response = await authVerifyEmailToken(userToken);

            if (!response.success) {
                setModalOpen(true);
                return;
            }

            // Verification successful
            setSuccessModalOpen(true);
        })()

    }, [userToken])

    if (!userToken || userToken == null) {
        return <Navigate to={"/login"} />
    }

    return (
        <>
            {isLoading &&
                <LineLoader />
            }

            {modalOpen && (
                <Modal closeModal={() => {
                    navigate("/login")
                }}>
                    <Notification error title="Error"
                        desc={<p>Email could not be verified!</p>}
                        action={() => {
                            navigate("/login")
                        }} buttonTitle="Close" />
                </Modal>
            )}

            {successModalOpen && (
                <Modal closeModal={() => {
                    navigate("/login")
                }}>
                    <Notification title="Info"
                        desc={<p>Email verification successful</p>}
                        action={() => {
                            navigate("/login")
                        }} buttonTitle="Close" />
                </Modal>
            )}
        </>

    )
}