import { Link } from "react-router-dom";
import { Mail, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Sparkles size={18} />
              </div>

              <span className="text-lg font-bold text-slate-900">
                Ask Me Something
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
              Ask questions using text, images, or voice and get clear
              AI-powered answers in seconds.
            </p>

            <a
              href="mailto:support@askmesomething.site"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              <Mail size={16} />
              support@askmesomething.site
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Quick Links
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link to="/" className="text-slate-600 hover:text-blue-600">
                Home
              </Link>

              <Link to="/about" className="text-slate-600 hover:text-blue-600">
                About
              </Link>

              <Link
                to="/contact"
                className="text-slate-600 hover:text-blue-600"
              >
                Contact
              </Link>

              <Link to="/ask" className="text-slate-600 hover:text-blue-600">
                Ask AI
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Legal</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link
                to="/privacy"
                className="text-slate-600 hover:text-blue-600"
              >
                Privacy Policy
              </Link>

              <Link to="/terms" className="text-slate-600 hover:text-blue-600">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Ask Me Something. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
