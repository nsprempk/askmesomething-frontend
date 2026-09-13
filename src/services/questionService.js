import api from "./api.js";

// ==========================================
// GET CATEGORIES
// ==========================================

export const getCategories = async () => {
  const response = await api.get("/categories");

  return response.data;
};

// ==========================================
// TEXT QUESTION
// ==========================================

export const askQuestion = async ({ question, categoryId, type = "text" }) => {
  const response = await api.post("/questions", {
    question,
    categoryId,
    type,
  });

  return response.data;
};

// ==========================================
// IMAGE QUESTION
// ==========================================

export const askImageQuestion = async ({ image, categoryId }) => {
  if (!image) {
    throw new Error("Please select an image first.");
  }

  const formData = new FormData();

  formData.append("image", image, image.name || "question-image.jpg");

  formData.append("categoryId", categoryId);

  console.log("=================================");
  console.log("SENDING IMAGE");
  console.log("Name:", image.name);
  console.log("Size:", image.size);
  console.log("Type:", image.type);
  console.log("=================================");

  const response = await api.post("/questions/image", formData);

  return response.data;
};

// ==========================================
// VOICE QUESTION
// ==========================================

export const askVoiceQuestion = async ({ audio, categoryId }) => {
  if (!audio) {
    throw new Error("Please record your question first.");
  }

  if (audio.size <= 0) {
    throw new Error("The recorded audio is empty.");
  }

  const formData = new FormData();

  // IMPORTANT:
  // Backend expects:
  // uploadAudio.single("audio")
  //
  // Therefore frontend MUST use:
  // "audio"

  const audioFile =
    audio instanceof File
      ? audio
      : new File([audio], "voice-question.webm", {
          type: audio.type || "audio/webm",
        });

  formData.append("audio", audioFile, audioFile.name || "voice-question.webm");

  formData.append("categoryId", categoryId);

  console.log("=================================");
  console.log("SENDING VOICE QUESTION");
  console.log("=================================");
  console.log("Name:", audioFile.name);
  console.log("Size:", audioFile.size);
  console.log("Type:", audioFile.type);
  console.log("Category:", categoryId);

  // Debug FormData
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log("FormData:", key, {
        name: value.name,
        size: value.size,
        type: value.type,
      });
    } else {
      console.log("FormData:", key, value);
    }
  }

  console.log("=================================");

  const response = await api.post("/questions/voice", formData);

  return response.data;
};
