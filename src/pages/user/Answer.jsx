import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  Loader2,
  Sparkles,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import api from "../../services/api.js";

const Answer = () => {
  const { id } = useParams();

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // LOAD QUESTION
  // ==========================================

  const loadQuestion = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/questions/${id}`);

      setQuestion(response.data.question || null);
    } catch (error) {
      console.error("Load answer error:", error);

      setError(error.response?.data?.message || "Unable to load this answer.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      setError("Invalid question ID.");
      setLoading(false);
      return;
    }

    loadQuestion();
  }, [id]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="flex items-center gap-3 text-slate-500">
          <Loader2 size={22} className="animate-spin" />
          Loading answer...
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-600" />

            <div>
              <h2 className="font-bold text-red-800">Unable to load answer</h2>

              <p className="mt-1 text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={loadQuestion}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <RefreshCw size={16} />
            Try Again
          </button>

          <Link
            to="/ask"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <ArrowLeft size={16} />
            Ask another question
          </Link>
        </div>
      </section>
    );
  }

  // ==========================================
  // NO QUESTION
  // ==========================================

  if (!question) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <h2 className="text-xl font-bold text-slate-900">
            Question not found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            This question may have been deleted or is no longer available.
          </p>

          <Link
            to="/ask"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <ArrowLeft size={17} />
            Ask a new question
          </Link>
        </div>
      </section>
    );
  }

  // ==========================================
  // PROCESSING
  // ==========================================

  if (question.status === "processing") {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-blue-200 bg-blue-50 p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <Loader2 size={27} className="animate-spin" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Your question is being processed
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">
            AI is processing your question. Please wait a moment while we
            generate your answer.
          </p>

          <button
            type="button"
            onClick={loadQuestion}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <RefreshCw size={17} />
            Check Again
          </button>
        </div>

        <Link
          to="/ask"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft size={16} />
          Ask another question
        </Link>
      </section>
    );
  }

  // ==========================================
  // FAILED
  // ==========================================

  if (question.status === "failed") {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
            <AlertCircle size={27} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            We couldn't generate your answer
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">
            Something went wrong while processing your question. Please try
            asking again.
          </p>

          {question.errorMessage && (
            <p className="mx-auto mt-4 max-w-lg rounded-xl bg-white px-4 py-3 text-sm text-red-700">
              {question.errorMessage}
            </p>
          )}

          <Link
            to="/ask"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <ArrowLeft size={17} />
            Ask Again
          </Link>
        </div>
      </section>
    );
  }

  // ==========================================
  // COMPLETED ANSWER
  // ==========================================

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* BACK */}
      <Link
        to="/ask"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
      >
        <ArrowLeft size={16} />
        Ask another question
      </Link>

      {/* MAIN CARD */}
      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* ======================================
            QUESTION
        ====================================== */}

        <div className="border-b border-slate-200 p-6 sm:p-8">
          {/* CATEGORY + TYPE */}

          <div className="flex flex-wrap items-center gap-2">
            {question.category && (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {question.category.icon} {question.category.name}
              </span>
            )}

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-600">
              {question.type}
            </span>

            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              <CheckCircle2 size={13} />
              Completed
            </span>
          </div>

          {/* QUESTION */}

          <h1 className="mt-5 text-2xl font-bold leading-8 text-slate-900 sm:text-3xl">
            {question.question}
          </h1>

          {/* VOICE TRANSCRIPTION */}

          {question.type === "voice" && question.transcription && (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Voice transcription
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {question.transcription}
              </p>
            </div>
          )}
        </div>

        {/* ======================================
            ANSWER
        ====================================== */}

        <div className="p-6 sm:p-8">
          {/* ANSWER HEADER */}

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Sparkles size={19} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">AI Answer</h2>

              <div className="mt-0.5 flex items-center gap-1 text-xs text-green-600">
                <CheckCircle2 size={13} />
                Answer generated successfully
              </div>
            </div>
          </div>

          {/* ANSWER CONTENT */}

          <div className="prose prose-slate mt-7 max-w-none whitespace-pre-wrap leading-7">
            {question.answer || "No answer was generated."}
          </div>

          {/* ======================================
              ACTIONS
          ====================================== */}

          <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-200 pt-6">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Bookmark size={17} />
              Save Answer
            </button>

            <Link
              to="/ask"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Sparkles size={17} />
              Ask Another Question
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Answer;
