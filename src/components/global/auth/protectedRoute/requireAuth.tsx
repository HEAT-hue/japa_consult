// ProtectedRoute.js
import { useAppSelector } from '@/hooks/typedHooks'
import { Outlet, Navigate } from 'react-router-dom'
import { useGetUserProfileHook } from '@/hooks/user'
import { useLocation } from 'react-router-dom'
import { LineLoader } from '../../loader'
import { Modal } from '../..'
import { Notification } from '../..'

export const RequireAuth: React.FC = () => {

    // Get User previous location history
    const location = useLocation();

    // Check the store for any existing user? Return children routes : Direct them to login page
    const { user } = useAppSelector((state) => state.auth)

    // Check if user is signed in
    if (user == null) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    // Get user profile
    const { trigger: getUserProfile, result: getUserProfileResult } = useGetUserProfileHook()

    // Fetch User Profile
    getUserProfile();

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
