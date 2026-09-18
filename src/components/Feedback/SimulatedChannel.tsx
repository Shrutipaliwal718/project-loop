"use client";

import { useState } from "react";
import styles from "./feedback.module.css";

const SimulatedChannel = () => {
  const [selectedChannel, setSelectedChannel] = useState("CHAT");
  const [isRunning, setIsRunning] = useState(false);

  const channels = [
    {
      id: "CHAT",
      name: "Live chat",
      description: "Simulate incoming support conversations",
    },
    {
      id: "EMAIL",
      name: "Email",
      description: "Simulate customer email feedback",
    },
    {
      id: "SURVEY",
      name: "Survey",
      description: "Simulate survey responses",
    },
  ];

  const handleSimulation = () => {
    setIsRunning(true);

    window.setTimeout(() => {
      setIsRunning(false);
    }, 1600);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div>
        <div className="mb-5">
          <h2 className="text-sm font-semibold text-white">
            Simulate a feedback channel
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Use simulated sources to test how LOOP handles incoming customer
            feedback.
          </p>
        </div>

        <div className="space-y-2">
          {channels.map((channel) => {
            const isSelected = selectedChannel === channel.id;

            return (
              <button
                key={channel.id}
                type="button"
                onClick={() => setSelectedChannel(channel.id)}
                className={`${styles.channelCard} ${
                  isSelected ? styles.channelCardSelected : ""
                } flex w-full items-center justify-between rounded-xl border p-4 text-left ${
                  isSelected ? "" : "border-white/[0.06] bg-[#030912]/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border text-xs ${
                      isSelected
                        ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                        : "border-white/[0.07] bg-white/[0.02] text-slate-500"
                    }`}
                  >
                    {channel.id === "CHAT" && "◌"}
                    {channel.id === "EMAIL" && "@"}
                    {channel.id === "SURVEY" && "✓"}
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-200">
                      {channel.name}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-600">
                      {channel.description}
                    </p>
                  </div>
                </div>

                <span
                  className={`${styles.radioIndicator} ${
                    isSelected ? styles.radioIndicatorSelected : ""
                  } h-4 w-4 rounded-full border ${
                    isSelected ? "" : "border-white/10"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleSimulation}
            disabled={isRunning}
            className={`${styles.primaryButton} inline-flex items-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-400/10 px-4 py-2.5 text-xs font-semibold text-cyan-300`}
          >
            {isRunning ? (
              <>
                <span className={styles.spinner} />
                <span className="relative z-10">Simulating</span>
              </>
            ) : (
              <>
                <span className="relative z-10">Run simulation</span>

                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-[#030912]/45 p-5">
        <div className="flex items-center gap-2">
          <span className="liveDot h-1.5 w-1.5 rounded-full bg-violet-400" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300/70">
            Simulation mode
          </span>
        </div>

        <h3 className="mt-4 text-xs font-semibold text-slate-200">
          Safe testing environment
        </h3>

        <p className="mt-2 text-[10px] leading-5 text-slate-600">
          Simulated sources are useful for testing ingestion and downstream AI
          analysis before connecting a real customer channel.
        </p>

        <div className="mt-5 rounded-lg border border-violet-400/10 bg-violet-400/[0.025] p-3">
          <p className="text-[9px] uppercase tracking-wider text-slate-600">
            Selected source
          </p>

          <p className="mt-1 text-xs font-medium text-violet-300">
            {channels.find((channel) => channel.id === selectedChannel)?.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimulatedChannel;
