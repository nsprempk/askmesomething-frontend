import { useState } from "react";
import { AlertTriangle, Eye, EyeOff, Loader2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";

const Profile = () => {
  const navigate = useNavigate();

  const { user, deleteAccount } = useAuth();

  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDeleteAccount = async (event) => {
    event.preventDefault();

    setError("");

    if (!password) {
      setError("Please enter your current password.");
      return;
    }

    try {
      setLoading(true);

      await deleteAccount(password);

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error("Delete account error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to delete your account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* HEADER */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Profile</h1>

          <p className="mt-2 text-slate-600">
            Manage your account and security settings.
          </p>
        </div>

        {/* PROFILE CARD */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">
            Account information
          </h2>

          <div className="mt-6 space-y-5">
            {/* NAME */}

            <div>
              <p className="text-sm font-medium text-slate-500">Name</p>

              <p className="mt-1 text-base font-semibold text-slate-900">
                {user?.name || "—"}
              </p>
            </div>

            {/* EMAIL */}

            <div>
              <p className="text-sm font-medium text-slate-500">Email</p>

              <p className="mt-1 text-base font-semibold text-slate-900">
                {user?.email || "—"}
              </p>
            </div>

            {/* PLAN */}

            <div>
              <p className="text-sm font-medium text-slate-500">Plan</p>

              <p className="mt-1 inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold capitalize text-blue-700">
                {user?.plan || "free"}
              </p>
            </div>
          </div>
        </div>

        {/* DANGER ZONE */}

        <div className="mt-8 rounded-2xl border border-red-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <AlertTriangle size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">Danger Zone</h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Deleting your account is permanent. Your account and associated
                question history will be removed.
              </p>
            </div>
          </div>

          {!showDeleteForm ? (
            <button
              type="button"
              onClick={() => {
                setError("");
                setPassword("");
                setShowDeleteForm(true);
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              <Trash2 size={18} />
              Delete Account
            </button>
          ) : (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">
              <h3 className="font-bold text-red-900">
                Confirm account deletion
              </h3>

              <p className="mt-2 text-sm leading-6 text-red-800">
                This action cannot be undone. Enter your current password to
                permanently delete your account.
              </p>

              {error && (
                <div className="mt-4 rounded-xl border border-red-300 bg-white px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleDeleteAccount} className="mt-5">
                <label
                  htmlFor="delete-password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Current password
                </label>

                <div className="relative">
                  <input
                    id="delete-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);

                      if (error) {
                        setError("");
                      }
                    }}
                    placeholder="Enter your current password"
                    autoComplete="current-password"
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    disabled={loading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={loading || !password}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 size={18} />
                        Permanently Delete Account
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => {
                      setShowDeleteForm(false);
                      setPassword("");
                      setError("");
                    }}
                    className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
