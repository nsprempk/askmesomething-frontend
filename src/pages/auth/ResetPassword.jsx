import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { resetPassword } from "../../services/authService.js";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!token) {
      setError("This password reset link is invalid.");
      return;
    }

    if (!password) {
      setError("Please enter your new password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const data = await resetPassword(token, password);

      if (data.success) {
        setSuccess(
          data.message || "Password reset successfully. You can now log in.",
        );

        setPassword("");
        setConfirmPassword("");
      } else {
        setError(data.message || "Unable to reset your password.");
      }
    } catch (error) {
      console.error("Reset password error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to reset your password. Please try again.",
      );
    } finally {
      setLoading(false);
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
                Create New Password
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Choose a strong new password for your account.
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
                    <p className="font-semibold text-green-800">
                      Password updated
                    </p>

                    <p className="mt-1 text-sm leading-5 text-green-700">
                      {success}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="mt-4 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Go to Login
                </button>
              </div>
            )}

            {/* ERROR */}

            {error && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* FORM */}

            {!success && (
              <form onSubmit={handleSubmit} className="mt-7">
                {/* PASSWORD */}

                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  New password
                </label>

                <div className="relative">
                  <KeyRound
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter new password"
                    autoComplete="new-password"
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Password must contain at least 6 characters.
                </p>

                {/* CONFIRM PASSWORD */}

                <label
                  htmlFor="confirmPassword"
                  className="mb-2 mt-5 block text-sm font-semibold text-slate-700"
                >
                  Confirm new password
                </label>

                <div className="relative">
                  <KeyRound
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((current) => !current)
                    }
                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={loading || !password || !confirmPassword}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    <>
                      <KeyRound size={18} />
                      Reset Password
                    </>
                  )}
                </button>
              </form>
            )}

            {/* BACK TO LOGIN */}

            {!success && (
              <div className="mt-7 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  <ArrowLeft size={16} />
                  Back to Login
                </Link>
              </div>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Password reset links are valid for 15 minutes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
