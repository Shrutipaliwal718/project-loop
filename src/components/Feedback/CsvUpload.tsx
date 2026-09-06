"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import styles from "./feedback.module.css";

const CsvUpload = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleFile = (selectedFile: File | undefined) => {
    if (!selectedFile) return;

    const isCsv =
      selectedFile.type === "text/csv" ||
      selectedFile.name.toLowerCase().endsWith(".csv");

    if (!isCsv) {
      setFile(null);
      setMessage("Please select a valid CSV file.");
      return;
    }

    setFile(selectedFile);
    setMessage(null);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files?.[0]);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    handleFile(event.dataTransfer.files?.[0]);
  };

  const removeFile = () => {
    setFile(null);
    setMessage(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div>
        <div className="mb-5">
          <h2 className="text-sm font-semibold text-white">
            Import feedback in bulk
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Upload a CSV containing customer feedback to process multiple
            responses together.
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          onChange={handleInputChange}
          className="hidden"
        />

        <div
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`${styles.dropZone} ${
            isDragging ? styles.dropZoneDragging : ""
          } cursor-pointer rounded-2xl border border-dashed border-white/[0.1] bg-[#030912]/45 p-8 text-center sm:p-12`}
        >
          <div
            className={`${styles.uploadIcon} mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-[#091523] text-slate-400`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 9l5-5 5 5"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 20h14" />
            </svg>
          </div>

          <h3 className="mt-4 text-xs font-semibold text-slate-200">
            {file ? file.name : "Drop your CSV file here"}
          </h3>

          <p className="mt-2 text-[10px] text-slate-600">
            {file
              ? `${(file.size / 1024).toFixed(1)} KB selected`
              : "or click to browse from your computer"}
          </p>
        </div>

        {file && (
          <div className="mt-4 flex items-center justify-between rounded-xl border border-cyan-400/10 bg-cyan-400/[0.035] px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-[9px] font-bold text-cyan-300">
                CSV
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-slate-300">
                  {file.name}
                </p>

                <p className="mt-0.5 text-[10px] text-slate-600">
                  Ready for import
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={removeFile}
              className="ml-3 rounded-md px-2 py-1 text-[10px] text-slate-500 transition hover:bg-white/[0.04] hover:text-red-300"
            >
              Remove
            </button>
          </div>
        )}

        {message && <p className="mt-3 text-xs text-red-300">{message}</p>}

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            disabled={!file}
            className={`${styles.primaryButton} rounded-lg border border-cyan-300/20 bg-cyan-400/10 px-4 py-2.5 text-xs font-semibold text-cyan-300`}
          >
            <span className="relative z-10">Import feedback</span>
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-[#030912]/45 p-5">
        <h3 className="text-xs font-semibold text-slate-200">
          Recommended format
        </h3>

        <p className="mt-2 text-[10px] leading-5 text-slate-600">
          Keep your CSV simple and consistent so the backend can process it
          reliably.
        </p>

        <div className="mt-5 overflow-hidden rounded-lg border border-white/[0.06]">
          <div className="grid grid-cols-2 border-b border-white/[0.06] bg-white/[0.025] px-3 py-2">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">
              Column
            </span>

            <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">
              Example
            </span>
          </div>

          <div className="grid grid-cols-2 px-3 py-2.5">
            <span className="text-[10px] text-slate-400">content</span>
            <span className="truncate text-[10px] text-slate-600">
              Customer response
            </span>
          </div>

          <div className="grid grid-cols-2 border-t border-white/[0.04] px-3 py-2.5">
            <span className="text-[10px] text-slate-400">channel</span>
            <span className="text-[10px] text-cyan-400/60">CSV</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CsvUpload;
