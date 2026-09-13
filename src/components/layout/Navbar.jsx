import { Link, NavLink } from "react-router-dom";
import { Menu, X, Sparkles, LogIn, UserPlus } from "lucide-react";
import { useState } from "react";

import { useAuth } from "../../context/AuthContext.jsx";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setMobileOpen(false)}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Sparkles size={19} />
          </div>

          <div>
            <div className="text-lg font-bold leading-none text-slate-900">
              Ask Me Something
            </div>

            <div className="hidden text-[10px] font-medium text-slate-500 sm:block">
              Ask. Learn. Understand.
            </div>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>

          {user && (
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          )}

          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        {/* Desktop auth */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link
                to="/ask"
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Ask AI
              </Link>

              <button
                onClick={logout}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                <LogIn size={16} />
                Login
              </Link>

              <Link
                to="/signup"
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <UserPlus size={16} />
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() => setMobileOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className="border-b border-slate-100 py-3 text-sm font-medium text-slate-600"
              onClick={() => setMobileOpen(false)}
            >
              About
            </NavLink>

            {user && (
              <>
                <NavLink
                  to="/dashboard"
                  className="border-b border-slate-100 py-3 text-sm font-medium text-slate-600"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/history"
                  className="border-b border-slate-100 py-3 text-sm font-medium text-slate-600"
                  onClick={() => setMobileOpen(false)}
                >
                  History
                </NavLink>

                <NavLink
                  to="/saved"
                  className="border-b border-slate-100 py-3 text-sm font-medium text-slate-600"
                  onClick={() => setMobileOpen(false)}
                >
                  Saved Answers
                </NavLink>
              </>
            )}

            <NavLink
              to="/contact"
              className="border-b border-slate-100 py-3 text-sm font-medium text-slate-600"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </NavLink>

            <div className="mt-4 flex gap-3">
              {user ? (
                <>
                  <Link
                    to="/ask"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    Ask AI
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
