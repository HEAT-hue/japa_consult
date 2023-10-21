// ProtectedRoute.js
import { useAppSelector } from '@/hooks/typedHooks'
import { Outlet, Navigate } from 'react-router-dom'
import { useGetUserProfileHook } from '@/hooks/user'
import { useLocation } from 'react-router-dom'
import { LineLoader } from '../../loader'
import { Modal } from '../..'
import { Notification } from '../..'
import { useEffect } from 'react'

export const RequireAuth: React.FC = () => {
    // Get User previous location history
    const location = useLocation();

    // Check the store for any existing user? Return children routes : Direct them to login page
    const { token } = useAppSelector((state) => state.auth)

    // Get user profile
    const { trigger: getUserProfile, result: getUserProfileResult } = useGetUserProfileHook()

    useEffect(() => {

        if (!token) {
            return;
        }

        // Fetch User Profile
        // getUserProfile();

    }, [token])

    // Check if any token exists
    if (token == null) {
        console.log(token);
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    // Display loader
    if (getUserProfileResult.isFetching) {
        return (
            <LineLoader />
        )
    }

    if (getUserProfileResult.isError) {
        return (
            <Modal closeModal={() => {
                getUserProfile();
            }}>
                <Notification error title="Error"
                    desc={<p>Could not fetch profile. Please try again</p>}
                    action={() => {
                        getUserProfile();
                    }} buttonTitle="Okay" />
            </Modal>
        )
    }

    return (
        // Render the protected routes
        <>
            <Outlet />
        </>
    )
}
