import { Routes, Route } from "react-router-dom";

import Home from "./pages/public/Home.jsx";
import About from "./pages/public/About.jsx";
import Contact from "./pages/public/Contact.jsx";
import Privacy from "./pages/public/Privacy.jsx";
import Terms from "./pages/public/Terms.jsx";

import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import VerifyEmail from "./pages/auth/VerifyEmail.jsx";

import Dashboard from "./pages/user/Dashboard.jsx";
import AskAI from "./pages/user/AskAI.jsx";
import Answer from "./pages/user/Answer.jsx";
import History from "./pages/user/History.jsx";
import Saved from "./pages/user/Saved.jsx";
import Profile from "./pages/user/Profile.jsx";

import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import AppDownload from "./components/layout/AppDownload.jsx";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* ======================================
              PUBLIC
          ======================================= */}

          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/privacy" element={<Privacy />} />

          <Route path="/terms" element={<Terms />} />

          {/* ======================================
              AUTH
          ======================================= */}

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/verify-email" element={<VerifyEmail />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* ======================================
              PROTECTED
          ======================================= */}

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/ask" element={<AskAI />} />

            <Route path="/answer/:id" element={<Answer />} />

            <Route path="/history" element={<History />} />

            <Route path="/saved" element={<Saved />} />

            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* ======================================
              404
          ======================================= */}

          <Route
            path="*"
            element={
              <div className="flex min-h-[60vh] items-center justify-center px-6">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-slate-900">404</h1>

                  <p className="mt-4 text-slate-600">
                    The page you're looking for doesn't exist.
                  </p>
                </div>
              </div>
            }
          />
        </Routes>
      </main>

      {/* ======================================
          APP DOWNLOAD / INSTALL
      ======================================= */}

      <AppDownload />

      <Footer />
    </div>
  );
}

export default App;
