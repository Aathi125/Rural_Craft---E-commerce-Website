import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const keyFor = (courseId) => `submission_${courseId}`;

const fileToDataURL = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const formatDateTime = (dt) =>
  new Date(dt).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

const getRemainingString = (createdAt) => {
  const start = new Date(createdAt).getTime();
  const deadline = start + 7 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  const diff = deadline - now;
  if (diff <= 0) return "Deadline passed";

  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  return `${days}d ${hours}h ${minutes}m remaining`;
};

export default function SubmissionPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [existing, setExisting] = useState(null);
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(keyFor(courseId));
      if (raw) {
        setExisting(JSON.parse(raw));
      } else {
        setExisting(null);
      }
    } catch (e) {
      console.error("Load submission error:", e);
    }
  }, [courseId]);

  const status = useMemo(
    () => (existing ? "✅ Submitted" : "❌ Not submitted"),
    [existing]
  );

  const submittedOn = useMemo(
    () => (existing ? formatDateTime(existing.createdAt) : "-"),
    [existing]
  );

  const remaining = useMemo(
    () =>
      existing ? getRemainingString(existing.createdAt) : "7d 0h 0m remaining",
    [existing]
  );

  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a PDF file");
      return;
    }
    if (file.type !== "application/pdf") {
      const proceed = window.confirm(
        "Selected file is not a PDF. Do you still want to store it?"
      );
      if (!proceed) return;
    }

    setBusy(true);
    try {
      const dataUrl = await fileToDataURL(file);

      const payload = {
        name: file.name,
        size: file.size,
        mime: file.type || "application/octet-stream",
        dataUrl,
        createdAt: Date.now(),
      };

      localStorage.setItem(keyFor(courseId), JSON.stringify(payload));
      setExisting(payload);
      setFile(null);
      alert(existing ? "✅ Submission replaced" : "✅ Submission uploaded");
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong while saving the file.");
    } finally {
      setBusy(false);
    }
  };

  const handleRemove = () => {
    const ok = window.confirm("Remove the existing submission?");
    if (!ok) return;
    localStorage.removeItem(keyFor(courseId));
    setExisting(null);
  };

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      {/* HERO HEADER */}
      <div className="relative px-6 md:px-12 py-12 bg-gradient-to-br from-[#3B2412] via-[#5A3821] to-[#8C6B52] text-center">
        <h2 className="text-5xl font-bold text-[#F5E1C9] drop-shadow-lg font-[Playfair Display]">
          📄 Submission Portal
        </h2>
        <p className="mt-3 text-lg text-[#E0C3A6] italic">
          Upload, replace, or manage your course submission
        </p>
      </div>

      {/* CONTENT */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-200">
          {/* STATUS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="text-sm text-gray-500">Status</p>
              <p
                className={`mt-1 font-semibold ${
                  existing ? "text-green-700" : "text-red-700"
                }`}
              >
                {status}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="text-sm text-gray-500">Submitted on</p>
              <p className="mt-1 font-semibold text-gray-800">{submittedOn}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="text-sm text-gray-500">Remaining time</p>
              <p className="mt-1 font-semibold text-gray-800">{remaining}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="text-sm text-gray-500">Submitted file</p>
              {existing ? (
                <a
                  href={existing.dataUrl}
                  download={existing.name}
                  className="mt-1 inline-block text-indigo-600 hover:underline break-all"
                >
                  {existing.name}
                </a>
              ) : (
                <p className="mt-1 text-gray-500">— No file —</p>
              )}
            </div>
          </div>

          {/* FILE UPLOAD */}
          <div className="space-y-4">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full rounded-lg border px-3 py-2"
            />

            <button
              disabled={busy}
              onClick={handleUpload}
              className="w-full rounded-lg bg-green-600 text-white font-semibold py-3 hover:bg-green-700 disabled:opacity-60"
            >
              🚀 {existing ? "Replace Submission" : "Upload Submission"}
            </button>

            {existing && (
              <button
                onClick={handleRemove}
                className="w-full rounded-lg bg-red-600 text-white font-semibold py-3 hover:bg-red-700"
              >
                🗑 Remove Submission
              </button>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={() => navigate(`/courses/${courseId}`)}
              className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              ⬅️ Back to Course
            </button>
          </div>

          {/* FOOTER HELP TEXT */}
          <p className="mt-6 text-xs text-gray-500 text-center">
            * Currently stored in <b>localStorage</b>. In backend integration,
            submissions will be saved in the database.
          </p>
        </div>
      </main>
    </div>
  );
}
