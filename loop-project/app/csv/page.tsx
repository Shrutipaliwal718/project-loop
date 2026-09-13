"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";

type CSVRow = string[];

export default function CSVPage() {
  const [fileName, setFileName] = useState("");
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<CSVRow[]>([]);
  const [message, setMessage] = useState("");

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setMessage("Please upload a CSV file.");
      return;
    }

    setFileName(file.name);
    setMessage("");

    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target?.result;

      if (typeof text !== "string") {
        setMessage("Unable to read the file.");
        return;
      }

      const lines = text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      if (lines.length === 0) {
        setMessage("The CSV file is empty.");
        return;
      }

      const csvData = lines.map((line) =>
        line.split(",").map((cell) => cell.trim().replace(/^"|"$/g, ""))
      );

      setHeaders(csvData[0]);
      setRows(csvData.slice(1));

      setMessage(`CSV uploaded successfully! ${csvData.length - 1} rows found.`);
    };

    reader.readAsText(file);
  };

  const clearCSV = () => {
    setFileName("");
    setHeaders([]);
    setRows([]);
    setMessage("");
  };

  return (
    <main className="min-h-screen bg-[#030912] text-white px-6 py-10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#19e6d1]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-[#8b5cf6]/10 rounded-full blur-3xl" />

      {/* Navbar */}
      <nav className="relative max-w-6xl mx-auto flex items-center justify-between mb-10">
        <Link href="/" className="inline-block">
          <h1 className="text-3xl font-bold tracking-wide">LOOP</h1>
          <p className="text-[#19e6d1] text-xs mt-1">
            FEEDBACK INTELLIGENCE
          </p>
        </Link>

        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-white transition"
        >
          ← Back to LOOP
        </Link>
      </nav>

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto">
        <div className="bg-[#091523]/90 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold">
              CSV Feedback Upload
            </h2>

            <p className="text-[#94a3b8] mt-2">
              Upload a CSV file to preview your feedback data.
            </p>
          </div>

          {/* Upload Box */}
          <div className="border border-dashed border-[#19e6d1]/40 rounded-xl p-8 text-center bg-[#07111d]/70">
            <div className="text-4xl mb-4">📄</div>

            <h3 className="text-lg font-medium">
              Upload CSV File
            </h3>

            <p className="text-sm text-[#64748b] mt-2 mb-5">
              Select a .csv file from your computer
            </p>

            <label className="inline-block cursor-pointer">
              <span className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-[#19e6d1] to-[#28a9ff] text-[#030912] font-semibold hover:opacity-90 transition">
                Choose CSV File
              </span>

              <input
                type="file"
                accept=".csv,text/csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {fileName && (
              <div className="mt-5 text-sm text-[#19e6d1]">
                Selected file: <span className="font-medium">{fileName}</span>
              </div>
            )}
          </div>

          {/* Message */}
          {message && (
            <div className="mt-6 rounded-lg border border-[#19e6d1]/30 bg-[#19e6d1]/10 px-4 py-3 text-sm text-[#19e6d1]">
              {message}
            </div>
          )}

          {/* Table */}
          {headers.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">
                    CSV Preview
                  </h3>

                  <p className="text-sm text-[#64748b] mt-1">
                    Showing {rows.length} feedback records
                  </p>
                </div>

                <button
                  onClick={clearCSV}
                  className="px-4 py-2 rounded-lg border border-white/10 text-sm text-gray-300 hover:text-white hover:border-[#19e6d1]/50 transition"
                >
                  Clear
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full min-w-[700px] text-sm">
                  <thead>
                    <tr className="bg-[#0b1726]">
                      {headers.map((header, index) => (
                        <th
                          key={index}
                          className="px-4 py-3 text-left font-semibold text-[#19e6d1] border-b border-white/10"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {rows.length > 0 ? (
                      rows.map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className="hover:bg-white/[0.03] transition"
                        >
                          {headers.map((_, columnIndex) => (
                            <td
                              key={columnIndex}
                              className="px-4 py-3 text-[#cbd5e1] border-b border-white/5"
                            >
                              {row[columnIndex] || "-"}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={headers.length}
                          className="px-4 py-8 text-center text-[#64748b]"
                        >
                          No data rows found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Empty State */}
          {headers.length === 0 && !message && (
            <div className="mt-8 text-center py-8">
              <p className="text-[#64748b]">
                No CSV file uploaded yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}