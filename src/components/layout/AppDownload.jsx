import { useEffect, useState } from "react";
import { Apple, Download, Smartphone, X } from "lucide-react";

const AppDownload = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();

      setInstallPrompt(event);
    };

    const handleAppInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    window.addEventListener("appinstalled", handleAppInstalled);

    // Check whether already running as an installed app
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isStandalone) {
      setInstalled(true);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );

      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const isIOS =
    /iphone|ipad|ipod/i.test(window.navigator.userAgent) && !window.MSStream;

  const handleAndroidInstall = async () => {
    if (!installPrompt) {
      return;
    }

    installPrompt.prompt();

    const { outcome } = await installPrompt.userChoice;

    if (outcome === "accepted") {
      setInstallPrompt(null);
    }
  };

  return (
    <section className="border-t border-slate-200 bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-3xl bg-slate-900 px-6 py-10 shadow-sm sm:px-10">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            {/* Content */}

            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <Smartphone size={24} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-blue-400">
                    TAKE IT WITH YOU
                  </p>

                  <h2 className="text-2xl font-bold text-white sm:text-3xl">
                    Get Ask Me Something on your phone
                  </h2>
                </div>
              </div>

              <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Install Ask Me Something on your phone for a fast, app-like
                experience. Add it to your home screen and access it anytime.
              </p>
            </div>

            {/* Buttons */}

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              {installed ? (
                <div className="rounded-xl bg-green-500/10 px-5 py-3 text-center text-sm font-semibold text-green-400">
                  App installed ✓
                </div>
              ) : (
                <>
                  {/* Android / Chrome */}

                  <button
                    type="button"
                    onClick={handleAndroidInstall}
                    disabled={!installPrompt}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                  >
                    <Download size={18} />

                    {installPrompt ? "Install App" : "Android Install"}
                  </button>

                  {/* iPhone */}

                  <button
                    type="button"
                    onClick={() => setShowIOSInstructions(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    <Apple size={18} />
                    Add to iPhone
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Android note */}

          {!installPrompt && !isIOS && !installed && (
            <p className="mt-6 text-xs text-slate-400">
              If the Install button is unavailable, open this website in a
              supported browser such as Chrome and look for the browser's
              install option.
            </p>
          )}
        </div>
      </div>

      {/* iOS Modal */}

      {showIOSInstructions && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-xl sm:p-8">
            <button
              type="button"
              onClick={() => setShowIOSInstructions(false)}
              className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-900">
              <Apple size={24} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              Add to iPhone Home Screen
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              In Safari on your iPhone or iPad:
            </p>

            <ol className="mt-5 space-y-4 text-sm text-slate-700">
              <li className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                  1
                </span>

                <span>
                  Tap the <strong>Share</strong> button in Safari.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                  2
                </span>

                <span>
                  Select <strong>Add to Home Screen</strong>.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                  3
                </span>

                <span>
                  Tap <strong>Add</strong>.
                </span>
              </li>
            </ol>

            <button
              type="button"
              onClick={() => setShowIOSInstructions(false)}
              className="mt-7 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AppDownload;
