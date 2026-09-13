import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bookmark,
  Clock3,
  MessageSquare,
  Sparkles,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext.jsx";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Welcome */}
      <div className="rounded-3xl bg-slate-900 p-7 text-white sm:p-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-blue-400">Welcome back</p>

            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Hi, {user?.name || "there"} 👋
            </h1>

            <p className="mt-3 max-w-xl text-slate-400">
              What would you like to know today?
            </p>
          </div>

          <Link
            to="/ask"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <Sparkles size={18} />
            Ask AI
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <MessageSquare size={21} />
          </div>

          <p className="mt-5 text-sm text-slate-500">Questions Asked</p>

          <p className="mt-1 text-3xl font-bold text-slate-900">0</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Clock3 size={21} />
          </div>

          <p className="mt-5 text-sm text-slate-500">Recent Questions</p>

          <p className="mt-1 text-3xl font-bold text-slate-900">0</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Bookmark size={21} />
          </div>

          <p className="mt-5 text-sm text-slate-500">Saved Answers</p>

          <p className="mt-1 text-3xl font-bold text-slate-900">0</p>
        </div>
      </div>

      {/* Start asking */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <Sparkles size={26} />
        </div>

        <h2 className="mt-5 text-2xl font-bold text-slate-900">
          Ask your first question
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-slate-600">
          Ask using text, an image, or your voice. Choose a topic and let AI
          help you understand it.
        </p>

        <Link
          to="/ask"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Start Asking
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default Dashboard;
