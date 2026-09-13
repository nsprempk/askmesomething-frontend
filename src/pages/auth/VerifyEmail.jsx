import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";

import { resendVerificationOTP } from "../../services/authService.js";

const VerifyEmail = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { verifyEmail } = useAuth();

  const emailFromURL = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailFromURL);

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const [resending, setResending] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [countdown, setCountdown] = useState(60);

  // ==========================================
  // COUNTDOWN
  // ==========================================

  useEffect(() => {
    if (countdown <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setCountdown((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // ==========================================
  // HANDLE OTP CHANGE
  // ==========================================

  const handleOTPChange = (event) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 6);

    setOtp(value);

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  };

  // ==========================================
  // VERIFY OTP
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Email address is required.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    try {
      setLoading(true);

      const data = await verifyEmail(normalizedEmail, otp);

      if (data.success) {
        setSuccess(data.message || "Email verified successfully.");

        setTimeout(() => {
          navigate("/dashboard", {
            replace: true,
          });
        }, 800);

        return;
      }

      setError(data.message || "Unable to verify your email.");
    } catch (error) {
      console.error("Email verification error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to verify your email. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // RESEND OTP
  // ==========================================

  const handleResend = async () => {
    setError("");
    setSuccess("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (countdown > 0) {
      return;
    }

    try {
      setResending(true);

      const data = await resendVerificationOTP(normalizedEmail);

      if (data.success) {
        setSuccess(data.message || "A new verification code has been sent.");

        setOtp("");

        setCountdown(60);
      } else {
        setError(data.message || "Unable to resend verification code.");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);

      setError(
        error.response?.data?.message || "Unable to resend verification code.",
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-md items-center justify-center">
        <div className="w-full">
          {/* CARD */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {/* ICON */}

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Sparkles size={27} />
            </div>

            {/* HEADER */}

            <div className="mt-6 text-center">
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Verify Your Email
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                We've sent a 6-digit verification code to your email address.
              </p>
            </div>

            {/* SUCCESS */}

            {success && (
              <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4">
                <div className="flex gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-green-600"
                  />

                  <div>
                    <p className="font-semibold text-green-800">Success</p>

                    <p className="mt-1 text-sm leading-5 text-green-700">
                      {success}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ERROR */}

            {error && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* FORM */}

            <form onSubmit={handleSubmit} className="mt-7">
              {/* EMAIL */}

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={loading || resending}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {/* OTP */}

              <label
                htmlFor="otp"
                className="mb-2 mt-5 block text-sm font-semibold text-slate-700"
              >
                Verification code
              </label>

              <input
                id="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={otp}
                onChange={handleOTPChange}
                placeholder="Enter 6-digit code"
                maxLength={6}
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-center text-xl font-bold tracking-[0.35em] text-slate-900 outline-none transition placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
              />

              {/* VERIFY */}

              <button
                type="submit"
                disabled={loading || resending || otp.length !== 6}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    Verify Email
                  </>
                )}
              </button>
            </form>

            {/* RESEND */}

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">Didn't receive the code?</p>

              <button
                type="button"
                onClick={handleResend}
                disabled={resending || countdown > 0}
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {resending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <RefreshCw size={16} />

                    {countdown > 0 ? `Resend in ${countdown}s` : "Resend Code"}
                  </>
                )}
              </button>
            </div>

            {/* BACK */}

            <div className="mt-7 text-center">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                <ArrowLeft size={16} />
                Back to Registration
              </Link>
            </div>
          </div>

          {/* FOOTER */}

          <p className="mt-6 text-center text-xs text-slate-400">
            Your verification code will expire after 10 minutes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VerifyEmail;
