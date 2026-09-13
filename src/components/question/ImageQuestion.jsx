import { useRef, useState } from "react";
import { Image as ImageIcon, Loader2, Sparkles, X } from "lucide-react";

const ImageQuestion = ({
  selectedImage,
  setSelectedImage,
  onAskAI,
  submitting,
}) => {
  const inputRef = useRef(null);

  const [preview, setPreview] = useState(null);

  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    setError("");

    if (!file) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a JPG, JPEG, PNG, or WEBP image.");

      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");

      event.target.value = "";
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setSelectedImage(file);

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  };

  const removeImage = () => {
    setSelectedImage(null);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* File input */}
      <div>
        <label
          htmlFor="question-image"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Upload your question image
        </label>

        <input
          ref={inputRef}
          id="question-image"
          name="image"
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileChange}
          disabled={submitting}
          className="block w-full cursor-pointer rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-700 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <p className="text-xs text-slate-500">
        Supported formats: JPG, JPEG, PNG, WEBP. Maximum size: 5 MB.
      </p>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2">
          <img
            src={preview}
            alt="Selected question"
            className="max-h-[400px] w-full rounded-xl object-contain"
          />

          <button
            type="button"
            onClick={removeImage}
            disabled={submitting}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Remove image"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Selected file */}
      {selectedImage && (
        <div className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3">
          <ImageIcon size={20} className="shrink-0 text-blue-600" />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-800">
              {selectedImage.name}
            </p>

            <p className="text-xs text-slate-500">
              {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
      )}

      {/* Ask AI */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onAskAI}
          disabled={submitting || !selectedImage}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Analyzing image...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Ask AI
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ImageQuestion;
