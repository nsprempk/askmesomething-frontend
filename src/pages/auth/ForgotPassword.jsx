import { useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2, Mail, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { forgotPassword } from "../../services/authService.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const data = await forgotPassword(email.trim());

      if (data.success) {
        setSuccess(
          data.message ||
            "If an account with that email exists, a password reset link has been sent.",
        );

        setEmail("");
      } else {
        setError(data.message || "Unable to send the password reset link.");
      }
    } catch (error) {
      console.error("Forgot password error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to send the password reset link. Please try again.",
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
                Forgot Password?
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Enter the email address associated with your account and we'll
                send you a password reset link.
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
                      Check your email
                    </p>

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

            {!success && (
              <form onSubmit={handleSubmit} className="mt-7">
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
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail size={18} />
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>
            )}

            {/* BACK TO LOGIN */}

            <div className="mt-7 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                <ArrowLeft size={16} />
                Back to Login
              </Link>
            </div>
          </div>

          {/* FOOTER TEXT */}

          <p className="mt-6 text-center text-xs text-slate-400">
            Your password reset link will expire after 15 minutes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
