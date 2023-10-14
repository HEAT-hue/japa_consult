import "./App.css";
import { BrowserRouter } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { LoginPage, RegisterPage } from "@/pages/global"
import { FilesPage } from "@/pages/user";
import { RequireAuth } from "@/components/global/auth/protectedRoute";
import { UserLayout } from "@/layouts/user";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* User protected routes */}
          {/* Ensure user is signed in before accessing the protected routes */}
          <Route element={<RequireAuth />}>

            {/* Only signed in users can access these routes */}
            <Route element={<UserLayout />}>
              <Route path="/" element={<p>This is the home page</p>} />
              <Route path="/users" element={<p>This is the users page</p>} />
              <Route path="/messages" element={<p>This is the messages page</p>} />
              <Route path="/notes" element={<p>This is the notes page</p>} />
              <Route path="/files" element={<FilesPage />} />
              <Route path="/invoice" element={<p>This is the invoice page</p>} />
              {/* <Route path="/trades" element={<TradeHistoryPage />} />
              <Route path="/trades/:id" element={<TradeHistoryPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/account/*">
                <Route index element={<AccountPage />} />
                <Route path="report" element={<ReportPage />} />
              </Route> */}
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  )
}