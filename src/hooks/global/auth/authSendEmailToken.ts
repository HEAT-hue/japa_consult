// jshint esversion:6
import { useSendEmailTokenMutation } from "@/app/services/auth"
import { MutationResultType } from "../../../data/global"
import { getErrorMessage } from "../../../utils/global"

export const useAuthSendEmailTokenHook = () => {

    // Login mutation for both users and admin
    const [sendToken, { isLoading, isError, isSuccess, reset }] = useSendEmailTokenMutation()

    async function authSendEmailToken(mail: string): Promise<MutationResultType> {
        // Clear all errors and messages
        let message = ""
        let success = false;
        let data;

        // make request
        try {
            const response = await sendToken({ mail }).unwrap();
            data = response;
            success = true;
        } catch (error) {
            console.log(error);
            console.log(isError);
            message = (error as any)?.status == 404 ? "Email not found" : getErrorMessage(error);
            console.log(message);
        }

        return { success, message, data };
    }

    return { authSendEmailToken, isLoading, isError, isSuccess, reset };
}