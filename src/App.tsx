import "./App.css";
import { BrowserRouter } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./app/store"

import {
  LoginPage, RegisterPage, VerifyUserEmailPage,
  PasswordResetPage, PasswordResetRequestPage, ComingSoonPage,
  AdminRegisterPage
} from "@/pages/global"

import {
  FilesPage, FolderPage, NotePage,
  CreateNotePage, InvoicePage, CreateInvoicePage
} from "@/pages/user";

import { AdminDashboardPage } from "./pages/admin";

import { RequireAuth, AdminRequireAuth } from "@/components/global/auth/protectedRoute";

import { AdminLayout, UserLayout } from "./layouts";


export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/auth/verifyEmail" element={<VerifyUserEmailPage />} />
          <Route path="/reset" element={<PasswordResetPage />} />
          <Route path="/password-reset" element={<PasswordResetRequestPage />} />
          <Route path="/admin/register" element={<AdminRegisterPage />} />

          {/* User protected routes */}
          {/* Ensure user is signed in before accessing the protected routes */}
          <Route element={<RequireAuth />}>
            {/* Only signed in users can access these routes */}
            <Route element={<UserLayout />}>
              <Route path="/" element={<ComingSoonPage />} />
              <Route path="/users" element={<ComingSoonPage />} />
              <Route path="/messages" element={<ComingSoonPage />} />
              <Route path="/notes" element={<NotePage />} />
              <Route path="/notes/create" element={<CreateNotePage />} />
              <Route path="/files" element={<FilesPage />} />
              <Route path="/files/file/:folderName" element={<FolderPage />} />
              <Route path="/invoice" element={<InvoicePage />} />
              <Route path="/invoice/create" element={<CreateInvoicePage />} />
            </Route>
          </Route>

          {/* Admin Protcected routes */}
          <Route element={<AdminRequireAuth />}>
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="users" element={<ComingSoonPage />} />
              <Route path="messages" element={<ComingSoonPage />} />
              <Route path="notes" element={<ComingSoonPage />} />
              <Route path="files" element={<ComingSoonPage />} />
              <Route path="invoice" element={<ComingSoonPage />} />
            </Route>
          </Route>

          {/* Error Page */}
          <Route path="*" element={<p>404, Page not found</p>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}