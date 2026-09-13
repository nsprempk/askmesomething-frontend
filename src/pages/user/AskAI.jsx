import { useEffect, useState } from "react";
import { Image, Loader2, MessageSquare, Mic, Sparkles, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import CategoryCard from "../../components/category/CategoryCard.jsx";
import ImageQuestion from "../../components/question/ImageQuestion.jsx";
import VoiceQuestion from "../../components/question/VoiceQuestion.jsx";

import {
  getCategories,
  askQuestion,
  askImageQuestion,
  askVoiceQuestion,
} from "../../services/questionService.js";

const QUESTION_LIMIT_BEFORE_AD = 5;

const AskAI = () => {
  const navigate = useNavigate();

  // ==========================================
  // LOADING STATES
  // ==========================================

  const [submitting, setSubmitting] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // ==========================================
  // ERRORS
  // ==========================================

  const [submitError, setSubmitError] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // CATEGORIES
  // ==========================================

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ==========================================
  // QUESTION TYPE
  // ==========================================

  const [questionType, setQuestionType] = useState("text");

  // ==========================================
  // TEXT QUESTION
  // ==========================================

  const [question, setQuestion] = useState("");

  // ==========================================
  // IMAGE QUESTION
  // ==========================================

  const [selectedImage, setSelectedImage] = useState(null);

  // ==========================================
  // VOICE QUESTION
  // ==========================================

  const [recordedAudio, setRecordedAudio] = useState(null);

  // ==========================================
  // QUESTION COUNTER
  // ==========================================

  const [questionCount, setQuestionCount] = useState(() => {
    try {
      const savedCount = localStorage.getItem("ask_ai_question_count");
      const parsedCount = Number(savedCount);

      if (Number.isFinite(parsedCount) && parsedCount >= 0) {
        return parsedCount;
      }

      return 0;
    } catch (error) {
      console.error("Unable to read question count:", error);
      return 0;
    }
  });

  // ==========================================
  // AD STATE
  // ==========================================

  const [showAd, setShowAd] = useState(false);

  // Question that should open after advertisement
  const [pendingAnswerId, setPendingAnswerId] = useState(null);

  // ==========================================
  // SAVE QUESTION COUNT
  // ==========================================

  useEffect(() => {
    try {
      localStorage.setItem("ask_ai_question_count", String(questionCount));
    } catch (error) {
      console.error("Unable to save question count:", error);
    }
  }, [questionCount]);

  // ==========================================
  // HANDLE SUCCESSFUL QUESTION
  // ==========================================

  const handleSuccessfulQuestion = (answerId) => {
    setQuestionCount((currentCount) => {
      const newCount = currentCount + 1;

      console.log("================================");
      console.log("SUCCESSFUL QUESTION");
      console.log("Previous count:", currentCount);
      console.log("New count:", newCount);
      console.log("Answer ID:", answerId);
      console.log("================================");

      // ========================================
      // SHOW AD AFTER 5 QUESTIONS
      // ========================================

      if (newCount >= QUESTION_LIMIT_BEFORE_AD) {
        console.log("5 QUESTIONS COMPLETED");
        console.log("SHOWING ADVERTISEMENT");

        // Save answer ID so we can navigate after ad
        setPendingAnswerId(answerId);

        setShowAd(true);

        // Reset counter
        return 0;
      }

      // ========================================
      // NO AD
      // ========================================

      navigate(`/answer/${answerId}`);

      return newCount;
    });
  };

  // ==========================================
  // CLOSE AD / CONTINUE
  // ==========================================

  const handleCloseAd = () => {
    console.log("Advertisement closed");

    setShowAd(false);

    if (pendingAnswerId) {
      const answerId = pendingAnswerId;

      setPendingAnswerId(null);

      navigate(`/answer/${answerId}`);
    }
  };

  // ==========================================
  // LOAD CATEGORIES
  // ==========================================

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true);
        setError("");

        const data = await getCategories();

        setCategories(data.categories || []);
      } catch (error) {
        console.error("Category loading error:", error);

        setError("Unable to load question categories.");
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  // ==========================================
  // QUESTION TYPES
  // ==========================================

  const questionTypes = [
    {
      id: "text",
      title: "Text",
      description: "Type your question",
      icon: MessageSquare,
    },
    {
      id: "image",
      title: "Image",
      description: "Upload a question",
      icon: Image,
    },
    {
      id: "voice",
      title: "Voice",
      description: "Ask using your voice",
      icon: Mic,
    },
  ];

  // ==========================================
  // CHANGE QUESTION TYPE
  // ==========================================

  const handleQuestionTypeChange = (type) => {
    setQuestionType(type);
    setSubmitError("");
  };

  // ==========================================
  // TEXT QUESTION
  // ==========================================

  const handleAskAI = async () => {
    setSubmitError("");

    if (!selectedCategory) {
      setSubmitError("Please choose a topic first.");
      return;
    }

    if (!question.trim()) {
      setSubmitError("Please enter your question.");
      return;
    }

    try {
      setSubmitting(true);

      const data = await askQuestion({
        question: question.trim(),
        categoryId: selectedCategory._id,
        type: "text",
      });

      if (data.success && data.question?._id) {
        handleSuccessfulQuestion(data.question._id);
      } else {
        setSubmitError("Unable to generate an answer. Please try again.");
      }
    } catch (error) {
      console.error("Text question error:", error);

      setSubmitError(
        error.response?.data?.message ||
          "Unable to generate an answer. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // IMAGE QUESTION
  // ==========================================

  const handleAskImageAI = async () => {
    setSubmitError("");

    if (!selectedCategory) {
      setSubmitError("Please choose a topic first.");
      return;
    }

    if (!selectedImage) {
      setSubmitError("Please select an image first.");
      return;
    }

    try {
      setSubmitting(true);

      const data = await askImageQuestion({
        image: selectedImage,
        categoryId: selectedCategory._id,
      });

      if (data.success && data.question?._id) {
        handleSuccessfulQuestion(data.question._id);
      } else {
        setSubmitError("Unable to analyze the image. Please try again.");
      }
    } catch (error) {
      console.error("Image question error:", error);

      setSubmitError(
        error.response?.data?.message ||
          "Unable to analyze the image. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // VOICE QUESTION
  // ==========================================

  const handleAskVoiceAI = async (audioFile) => {
    setSubmitError("");

    if (!selectedCategory) {
      setSubmitError("Please choose a topic first.");
      return;
    }

    if (!audioFile) {
      setSubmitError("Please record your question first.");
      return;
    }

    if (audioFile.size === 0) {
      setSubmitError(
        "The recording is empty. Please record your question again.",
      );
      return;
    }

    try {
      setSubmitting(true);

      console.log("================================");
      console.log("SENDING VOICE QUESTION");
      console.log("File:", audioFile);
      console.log("Name:", audioFile.name);
      console.log("Size:", audioFile.size);
      console.log("Type:", audioFile.type);
      console.log("Category:", selectedCategory._id);
      console.log("================================");

      const data = await askVoiceQuestion({
        audio: audioFile,
        categoryId: selectedCategory._id,
      });

      console.log("Voice API response:", data);

      if (data.success && data.question?._id) {
        handleSuccessfulQuestion(data.question._id);
      } else {
        setSubmitError(
          data.message ||
            "Unable to process your voice question. Please try again.",
        );
      }
    } catch (error) {
      console.error("Voice question error:", error);

      setSubmitError(
        error.response?.data?.message ||
          "Unable to process your voice question. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* ======================================
            HEADER
        ====================================== */}

        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Sparkles size={28} />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-900 sm:text-4xl">
            Ask Me Something
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Choose a topic and ask your question using text, an image, or your
            voice.
          </p>
        </div>

        {/* ======================================
            CATEGORIES
        ====================================== */}

        <div className="mt-12">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              1. Choose a topic
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select the topic that best matches your question.
            </p>
          </div>

          {loadingCategories ? (
            <div className="flex min-h-40 items-center justify-center rounded-2xl border border-slate-200 bg-white">
              <div className="flex items-center gap-3 text-slate-500">
                <Loader2 size={20} className="animate-spin" />
                Loading topics...
              </div>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
              {error}
            </div>
          ) : categories.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
              No topics are available right now.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categories.map((category) => (
                <CategoryCard
                  key={category._id}
                  category={category}
                  selected={selectedCategory?._id === category._id}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSubmitError("");
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* ======================================
            QUESTION METHOD
        ====================================== */}

        <div className="mt-12">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              2. How would you like to ask?
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose your preferred question format.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {questionTypes.map((type) => {
              const Icon = type.icon;
              const selected = questionType === type.id;

              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleQuestionTypeChange(type.id)}
                  disabled={submitting}
                  className={`rounded-2xl border p-5 text-left transition ${
                    selected
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                      : "border-slate-200 bg-white hover:border-blue-300"
                  } ${submitting ? "cursor-not-allowed opacity-60" : ""}`}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      selected
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-4 font-bold text-slate-900">
                    {type.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {type.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================
            ASK QUESTION
        ====================================== */}

        <div className="mt-12">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              3. Ask your question
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Ask anything related to your selected topic.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            {/* ERROR */}

            {submitError && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {submitError}
              </div>
            )}

            {/* TEXT */}

            {questionType === "text" && (
              <>
                <textarea
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder="Type your question here..."
                  rows={7}
                  disabled={submitting}
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="text-sm text-slate-500">
                    {selectedCategory ? (
                      <>
                        Topic:{" "}
                        <span className="font-semibold text-slate-700">
                          {selectedCategory.icon} {selectedCategory.name}
                        </span>
                      </>
                    ) : (
                      "Choose a topic above"
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleAskAI}
                    disabled={
                      submitting || !selectedCategory || !question.trim()
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Thinking...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        Ask AI
                      </>
                    )}
                  </button>
                </div>
              </>
            )}

            {/* IMAGE */}

            {questionType === "image" && (
              <ImageQuestion
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                onAskAI={handleAskImageAI}
                submitting={submitting}
              />
            )}

            {/* VOICE */}

            {questionType === "voice" && (
              <VoiceQuestion
                recordedAudio={recordedAudio}
                setRecordedAudio={setRecordedAudio}
                onAskAI={handleAskVoiceAI}
                submitting={submitting}
              />
            )}
          </div>
        </div>
      </section>

      {/* ==========================================
          AD OVERLAY
      ========================================== */}

      {showAd && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            {/* CLOSE */}

            <button
              type="button"
              onClick={handleCloseAd}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Close advertisement"
            >
              <X size={20} />
            </button>

            {/* CONTENT */}

            <div className="pt-4 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <Sparkles size={22} />
              </div>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Advertisement
              </p>

              {/* ==================================
                  ADVERTISEMENT AREA
              ================================== */}

              <div className="mt-4 flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">
                <div className="text-center">
                  <p className="font-semibold text-slate-700">Ad Space</p>

                  <p className="mt-1 text-sm text-slate-500">
                    Advertisement will appear here.
                  </p>
                </div>
              </div>

              {/* CONTINUE */}

              <button
                type="button"
                onClick={handleCloseAd}
                className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Continue to Answer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AskAI;
