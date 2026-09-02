const teams = ["Acme", "Boltshift", "Hexa", "Spherule", "Layers"];

export default function TrustBar() {
  return (
    <section className="border-b border-white/[0.05] pb-4">
      <div className="mx-auto max-w-5xl px-5 text-center">
        <div className="text-[10px] font-semibold tracking-[0.24em] text-slate-500">
          TRUSTED BY INNOVATIVE TEAMS
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xl font-bold tracking-tight text-slate-600 sm:gap-x-14">
          {teams.map((team) => <span key={team}>{team}</span>)}
        </div>
      </div>
    </section>
  );
}
