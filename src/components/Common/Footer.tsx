import Link from "next/link";
import LoopLogo from "./LoopLogo";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] [html.light_&]:border-slate-300 bg-[#02070d] [html.light_&]:bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <LoopLogo size={42} />
              <div>
                <div className="text-lg font-extrabold text-white [html.light_&]:text-slate-900">
                  LOOP
                </div>
                <div className="mt-1 text-[8px] font-semibold tracking-[0.18em] text-slate-500 [html.light_&]:text-slate-600 [html.light_&]:text-slate-700">
                  FEEDBACK INTELLIGENCE
                </div>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-xs leading-6 text-slate-500 [html.light_&]:text-slate-600 [html.light_&]:text-slate-700">
              An AI-powered customer feedback intelligence platform designed to
              help teams understand sentiment, themes, trends and actions.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-500 [html.light_&]:text-slate-600 [html.light_&]:text-slate-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              Customer intelligence platform
            </div>
          </div>

          <FooterColumn
            title="Platform"
            links={[
              ["Product", "#product"],
              ["Features", "#features"],
              ["How It Works", "#how-it-works"],
              ["Insights", "#insights"],
            ]}
          />
          <FooterColumn
            title="Intelligence"
            links={[
              ["Feedback Inbox", "/inbox"],
              ["Dashboard", "/dashboard"],
              ["Trends", "/trends"],
              ["Ask LOOP", "/ask"],
              ["Reports", "/reports"],
            ]}
          />

          <div>
            <h3 className="text-xs font-bold text-white [html.light_&]:text-slate-900">
              Contact
            </h3>
            <div className="mt-4 space-y-3 text-xs text-slate-500 [html.light_&]:text-slate-600 [html.light_&]:text-slate-700">
              <div>
                <div className="font-semibold text-slate-300 [html.light_&]:text-slate-800">
                  Email
                </div>
                <div className="mt-1">hello@loop-feedback.example</div>
              </div>
              <div>
                <div className="font-semibold text-slate-300 [html.light_&]:text-slate-800">
                  Location
                </div>
                <div className="mt-1">Bengaluru, India</div>
              </div>
              <div>
                <div className="font-semibold text-slate-300 [html.light_&]:text-slate-800">
                  Availability
                </div>
                <div className="mt-1">Monâ€“Fri Â· 9:00 AMâ€“6:00 PM</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.07] [html.light_&]:border-slate-300 pt-6 text-[10px] text-slate-600 [html.light_&]:text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <div>Â© 2026 LOOP. Built for customer feedback intelligence.</div>
          <div className="flex gap-5">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h3 className="text-xs font-bold text-white [html.light_&]:text-slate-900">
        {title}
      </h3>
      <div className="mt-4 space-y-2.5">
        {links.map(([label, href]) => (
          <Link
            key={label}
            href={href}
            className="block text-xs text-slate-500 [html.light_&]:text-slate-600 [html.light_&]:text-slate-700 transition-colors hover:text-cyan-300"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
