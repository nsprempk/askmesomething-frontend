import { useEffect, useRef, useState } from "react";
import {
  Mic,
  Square,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

const VoiceQuestion = ({
  recordedAudio,
  setRecordedAudio,
  onAskAI,
  submitting = false,
}) => {
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioChunksRef = useRef([]);

  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState("");

  // ==========================================
  // START RECORDING
  // ==========================================

  const startRecording = async () => {
    try {
      setError("");

      // Clear previous recording
      setRecordedAudio(null);

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }

      // Check browser support
      if (!navigator.mediaDevices?.getUserMedia) {
        setError("Voice recording is not supported in this browser.");
        return;
      }

      if (typeof MediaRecorder === "undefined") {
        setError("Voice recording is not supported in this browser.");
        return;
      }

      // Ask for microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      mediaStreamRef.current = stream;

      audioChunksRef.current = [];

      // ==========================================
      // SELECT AUDIO FORMAT
      // ==========================================

      let options = {};

      if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
        options = {
          mimeType: "audio/webm;codecs=opus",
        };
      } else if (MediaRecorder.isTypeSupported("audio/webm")) {
        options = {
          mimeType: "audio/webm",
        };
      } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
        options = {
          mimeType: "audio/mp4",
        };
      } else if (MediaRecorder.isTypeSupported("audio/ogg")) {
        options = {
          mimeType: "audio/ogg",
        };
      }

      const recorder = new MediaRecorder(stream, options);

      mediaRecorderRef.current = recorder;

      console.log("MediaRecorder created");
      console.log("MIME type:", recorder.mimeType);

      // ==========================================
      // COLLECT AUDIO DATA
      // ==========================================

      recorder.ondataavailable = (event) => {
        console.log(
          "Audio data available:",
          event.data?.size,
          event.data?.type,
        );

        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // ==========================================
      // RECORDING STOPPED
      // ==========================================

      recorder.onstop = () => {
        try {
          console.log("Recording stopped.");
          console.log("Audio chunks:", audioChunksRef.current.length);

          const mimeType = recorder.mimeType || "audio/webm";

          const audioBlob = new Blob(audioChunksRef.current, {
            type: mimeType,
          });

          console.log("================================");
          console.log("RECORDED AUDIO CREATED");
          console.log("Size:", audioBlob.size);
          console.log("Type:", audioBlob.type);
          console.log("================================");

          if (audioBlob.size === 0) {
            setError("The recording is empty. Please try recording again.");
            return;
          }

          // ==========================================
          // CREATE FILE
          // ==========================================

          let extension = "webm";

          if (mimeType.includes("mp4")) {
            extension = "mp4";
          } else if (mimeType.includes("ogg")) {
            extension = "ogg";
          } else if (mimeType.includes("mpeg")) {
            extension = "mp3";
          } else if (mimeType.includes("wav")) {
            extension = "wav";
          }

          const audioFile = new File(
            [audioBlob],
            `voice-question-${Date.now()}.${extension}`,
            {
              type: mimeType,
              lastModified: Date.now(),
            },
          );

          console.log("================================");
          console.log("AUDIO FILE READY");
          console.log("Name:", audioFile.name);
          console.log("Size:", audioFile.size);
          console.log("Type:", audioFile.type);
          console.log("================================");

          // Save audio file in parent state
          setRecordedAudio(audioFile);

          // Create preview
          const url = URL.createObjectURL(audioFile);
          setAudioUrl(url);

          setError("");
        } catch (error) {
          console.error("Error creating audio file:", error);

          setError("Unable to process the recording. Please try again.");
        }
      };

      // ==========================================
      // HANDLE RECORDER ERROR
      // ==========================================

      recorder.onerror = (event) => {
        console.error("MediaRecorder error:", event);

        setError("An error occurred while recording. Please try again.");

        setIsRecording(false);
      };

      // ==========================================
      // START
      // ==========================================

      recorder.start(250);

      setIsRecording(true);

      console.log("Recording started.");
    } catch (error) {
      console.error("Microphone error:", error);

      if (error.name === "NotAllowedError") {
        setError(
          "Microphone permission was denied. Please allow microphone access and try again.",
        );
      } else if (error.name === "NotFoundError") {
        setError(
          "No microphone was found. Please connect a microphone and try again.",
        );
      } else if (error.name === "NotReadableError") {
        setError(
          "Your microphone is already being used by another application.",
        );
      } else {
        setError("Unable to access your microphone. Please try again.");
      }
    }
  };

  // ==========================================
  // STOP RECORDING
  // ==========================================

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;

    if (!recorder) {
      console.warn("No MediaRecorder found.");
      return;
    }

    console.log("Stopping recording...");

    if (recorder.state === "recording") {
      recorder.stop();
    }

    // Stop microphone tracks
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      mediaStreamRef.current = null;
    }

    setIsRecording(false);
  };

  // ==========================================
  // REMOVE RECORDING
  // ==========================================

  const removeRecording = () => {
    console.log("Removing recording.");

    setRecordedAudio(null);

    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    setAudioUrl(null);
    setError("");

    audioChunksRef.current = [];
    mediaRecorderRef.current = null;

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      mediaStreamRef.current = null;
    }
  };

  // ==========================================
  // ASK AI
  // ==========================================

  const handleAskAI = () => {
    console.log("================================");
    console.log("ASK AI CLICKED");
    console.log("Recorded audio:", recordedAudio);
    console.log("================================");

    if (!recordedAudio) {
      setError("Please record your question first.");
      return;
    }

    if (recordedAudio.size === 0) {
      setError("The recording is empty. Please record your question again.");
      return;
    }

    setError("");

    // IMPORTANT:
    // Pass the actual recorded audio to AskAI.jsx
    onAskAI(recordedAudio);
  };

  // ==========================================
  // CLEANUP
  // ==========================================

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }

      if (mediaRecorderRef.current) {
        if (mediaRecorderRef.current.state === "recording") {
          mediaRecorderRef.current.stop();
        }
      }

      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [audioUrl]);

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="space-y-6">
      {/* ==========================================
          RECORDING AREA
      ========================================== */}

      <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center sm:p-10">
        {/* MICROPHONE */}

        <div
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
            isRecording
              ? "animate-pulse bg-red-100 text-red-600"
              : "bg-blue-50 text-blue-600"
          }`}
        >
          <Mic size={30} />
        </div>

        {/* TITLE */}

        <h3 className="mt-5 text-lg font-bold text-slate-900">
          {isRecording
            ? "Recording your question..."
            : recordedAudio
              ? "Question recorded"
              : "Ask with your voice"}
        </h3>

        {/* DESCRIPTION */}

        <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">
          {isRecording
            ? "Speak clearly. Click Stop Recording when you are finished."
            : recordedAudio
              ? "Your recording is ready. You can listen to it before asking AI."
              : "Record your question and AI will process your voice."}
        </p>

        {/* ==========================================
            START RECORDING
        ========================================== */}

        {!isRecording && !recordedAudio && (
          <button
            type="button"
            onClick={startRecording}
            disabled={submitting}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Mic size={19} />
            Start Recording
          </button>
        )}

        {/* ==========================================
            STOP RECORDING
        ========================================== */}

        {isRecording && (
          <button
            type="button"
            onClick={stopRecording}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            <Square size={18} fill="currentColor" />
            Stop Recording
          </button>
        )}
      </div>

      {/* ==========================================
          ERROR
      ========================================== */}

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={19} className="mt-0.5 shrink-0" />

          <span>{error}</span>
        </div>
      )}

      {/* ==========================================
          AUDIO PREVIEW
      ========================================== */}

      {recordedAudio && audioUrl && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          {/* RECORDING INFO */}

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <CheckCircle size={21} />
            </div>

            <div>
              <p className="font-semibold text-slate-900">Recording ready</p>

              <p className="text-xs text-slate-500">
                {(recordedAudio.size / 1024).toFixed(1)} KB
              </p>

              <p className="text-xs text-slate-400">
                {recordedAudio.type || "audio"}
              </p>
            </div>
          </div>

          {/* AUDIO PLAYER */}

          <audio controls src={audioUrl} className="mt-4 w-full" />

          {/* ==========================================
              ACTIONS
          ========================================== */}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            {/* RECORD AGAIN */}

            <button
              type="button"
              onClick={removeRecording}
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw size={18} />
              Record Again
            </button>

            {/* ASK AI */}

            <button
              type="button"
              onClick={handleAskAI}
              disabled={submitting || !recordedAudio}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Thinking...
                </>
              ) : (
                <>
                  <Mic size={18} />
                  Ask AI
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceQuestion;
