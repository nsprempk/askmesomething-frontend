import { X } from "lucide-react";

const QuestionAd = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl">
        {/* CLOSE */}

        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          aria-label="Close advertisement"
        >
          <X size={20} />
        </button>

        {/* TITLE */}

        <div className="pr-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Advertisement
          </p>

          <h2 className="mt-2 text-xl font-bold text-slate-900">
            Thanks for using Ask Me Something
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Your answer is ready. You can continue asking questions after this
            short break.
          </p>
        </div>

        {/* ADVERTISEMENT AREA */}

        <div className="mt-5 flex min-h-[180px] items-center justify-center rounded-xl bg-slate-50">
          <div className="text-center">
            <p className="text-xs font-medium text-slate-400">Advertisement</p>

            <p className="mt-1 text-xs text-slate-400">
              Your AdSense advertisement will appear here.
            </p>
          </div>
        </div>

        {/* CONTINUE */}

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default QuestionAd;
