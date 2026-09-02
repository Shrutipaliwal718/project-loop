type IconName =
  | "brain" | "clock" | "spark" | "shield" | "message" | "smile"
  | "layers" | "bolt" | "inbox" | "trend" | "search" | "users"
  | "upload" | "chart" | "arrow" | "check" | "alert" | "sun"
  | "moon" | "menu" | "close" | "play";

type LoopIconProps = {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export default function LoopIcon({
  name,
  size = 20,
  strokeWidth = 1.8,
  className = "",
}: LoopIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  const icons: Record<IconName, React.ReactNode> = {
    brain: <>
      <path d="M9 4.5a3 3 0 0 0-5 2.2A3.2 3.2 0 0 0 5 12a3.2 3.2 0 0 0 0 6.2A3 3 0 0 0 9 19.5V4.5Z" />
      <path d="M15 4.5a3 3 0 0 1 5 2.2A3.2 3.2 0 0 1 19 12a3.2 3.2 0 0 1 0 6.2 3 3 0 0 1-4 1.3V4.5Z" />
      <path d="M9 8h2m4 0h-2M9 16h2m4 0h-2M12 5v14" />
    </>,
    clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3 2" /></>,
    spark: <><path d="m12 3-1.5 5.5L5 10l5.5 1.5L12 17l1.5-5.5L19 10l-5.5-1.5L12 3Z" /><path d="m19 15-.7 2.3L16 18l2.3.7L19 21l.7-2.3L22 18l-2.3-.7L19 15Z" /></>,
    shield: <><path d="M12 3 20 6v5c0 5-3.2 8.1-8 10-4.8-1.9-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>,
    message: <><rect x="4" y="5" width="16" height="13" rx="3" /><path d="m8 18-1 3 4-3M8 10h8M8 13h5" /></>,
    smile: <><circle cx="12" cy="12" r="8.5" /><path d="M8.5 10h.01M15.5 10h.01M8.5 14a4.3 4.3 0 0 0 7 0" /></>,
    layers: <><path d="m12 4 8 4-8 4-8-4 8-4Z" /><path d="m4 12 8 4 8-4M4 16l8 4 8-4" /></>,
    bolt: <path d="m13 2-8 11h6l-1 9 8-12h-6l1-8Z" />,
    inbox: <><path d="M4 6h16v12H4z" /><path d="M4 13h4l2 3h4l2-3h4" /></>,
    trend: <><path d="M4 17 9 12l3 3 7-8" /><path d="M15 7h4v4" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.2" /><path d="m16 16 4 4" /></>,
    users: <><circle cx="9" cy="9" r="3" /><path d="M3.5 19c.5-3 2.3-4.5 5.5-4.5s5 1.5 5.5 4.5M16 6.5a3 3 0 0 1 0 5.8M17 14.5c2.1.4 3.3 1.8 3.5 3.8" /></>,
    upload: <><path d="M12 15V4m0 0L8 8m4-4 4 4" /><path d="M5 14v5h14v-5" /></>,
    chart: <><path d="M4 19V5M4 19h17" /><path d="m7 15 4-4 3 2 5-6" /></>,
    arrow: <path d="M5 12h13m-5-5 5 5-5 5" />,
    check: <path d="m5 12 4 4L19 6" />,
    alert: <><path d="m12 4 8 15H4L12 4Z" /><path d="M12 9v4M12 16h.01" /></>,
    sun: <><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    moon: <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    play: <path d="m10 8 6 4-6 4V8Z" />,
  };

  return <svg {...common}>{icons[name]}</svg>;
}
