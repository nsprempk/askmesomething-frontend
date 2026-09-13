import { createContext, useContext, useEffect, useState } from "react";

const QuestionUsageContext = createContext(null);

const STORAGE_KEY = "ask_me_something_question_usage";
const QUESTIONS_PER_AD = 5;

const QuestionUsageProvider = ({ children }) => {
  const [completedQuestions, setCompletedQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        return 0;
      }

      const parsed = Number(saved);

      return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
    } catch (error) {
      console.error("Unable to load question usage:", error);

      return 0;
    }
  });

  const [showAd, setShowAd] = useState(false);

  // ==========================================
  // SAVE COUNTER
  // ==========================================

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(completedQuestions));
    } catch (error) {
      console.error("Unable to save question usage:", error);
    }
  }, [completedQuestions]);

  // ==========================================
  // QUESTION COMPLETED
  // ==========================================

  const questionCompleted = () => {
    setCompletedQuestions((currentCount) => {
      const newCount = currentCount + 1;

      console.log("=================================");
      console.log("AI QUESTION COMPLETED");
      console.log("Completed questions:", newCount);
      console.log("=================================");

      // Show ad after every 5 questions
      if (newCount % QUESTIONS_PER_AD === 0) {
        setShowAd(true);
      }

      return newCount;
    });
  };

  // ==========================================
  // CLOSE AD
  // ==========================================

  const closeAd = () => {
    setShowAd(false);
  };

  // ==========================================
  // RESET
  // ==========================================

  const resetQuestionUsage = () => {
    setCompletedQuestions(0);
    setShowAd(false);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Unable to reset question usage:", error);
    }
  };

  // ==========================================
  // QUESTIONS UNTIL NEXT AD
  // ==========================================

  const questionsUntilAd =
    QUESTIONS_PER_AD - (completedQuestions % QUESTIONS_PER_AD);

  return (
    <QuestionUsageContext.Provider
      value={{
        completedQuestions,
        questionsUntilAd,
        showAd,
        questionCompleted,
        closeAd,
        resetQuestionUsage,
      }}
    >
      {children}
    </QuestionUsageContext.Provider>
  );
};

// ==========================================
// CUSTOM HOOK
// ==========================================

export const useQuestionUsage = () => {
  const context = useContext(QuestionUsageContext);

  if (!context) {
    throw new Error(
      "useQuestionUsage must be used inside QuestionUsageProvider.",
    );
  }

  return context;
};

export default QuestionUsageProvider;
