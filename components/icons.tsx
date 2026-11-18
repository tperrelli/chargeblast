import type { SVGProps } from "react";

type IconName =
  | "search"
  | "chevronDown"
  | "chevronLeft"
  | "chevronRight"
  | "home"
  | "payments"
  | "customers"
  | "balance"
  | "catalog"
  | "settings"
  | "help"
  | "bell"
  | "filter"
  | "calendar"
  | "copy"
  | "check"
  | "arrowUpDown"
  | "close"
  | "card"
  | "wallet"
  | "bank"
  | "external"
  | "plusCircle"
  | "export"
  | "more";
type IconProps = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

const paths: Record<IconName, string> = {
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.35-4.35",
  chevronDown: "m7 10 5 5 5-5",
  chevronLeft: "m15 18-6-6 6-6",
  chevronRight: "m9 18 6-6-6-6",
  home: "m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9Zm6 11v-7h6v7",
  payments: "M3 7h18v12H3zM3 10h18M7 15h4",
  customers:
    "M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  balance: "M3 7h18v12H3zM3 7l3-3h12l3 3M16 14h2",
  catalog: "M4 7 12 3l8 4v10l-8 4-8-4V7Zm0 0 8 4 8-4M12 11v10",
  settings:
    "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.8 3.12-.08-.02a1.7 1.7 0 0 0-1.8.64l-.05.07h-3.6l-.03-.08a1.7 1.7 0 0 0-1.52-1.14 1.7 1.7 0 0 0-1.52 1.14l-.03.08h-3.6l-.05-.07a1.7 1.7 0 0 0-1.8-.64l-.08.02-1.8-3.12.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.5-1.13H3v-3.74h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.88L4.2 7.06 6 3.94l.08.02a1.7 1.7 0 0 0 1.8-.64l.05-.07h3.6l.03.08a1.7 1.7 0 0 0 3.04 0l.03-.08h3.6l.05.07a1.7 1.7 0 0 0 1.8.64l.08-.02 1.8 3.12-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.5 1.13h.1v3.74h-.1A1.7 1.7 0 0 0 19.4 15Z",
  help: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9.7 9a2.4 2.4 0 1 1 4.1 1.7c-.9.7-1.8 1.2-1.8 2.6M12 17h.01",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4",
  filter: "M4 7h16M7 12h10M10 17h4",
  calendar: "M4 5h16v16H4zM8 3v4M16 3v4M4 10h16",
  copy: "M8 8h11v12H8zM16 8V4H4v12h4",
  check: "m5 12 4 4L19 6",
  arrowUpDown: "m8 4-3 3h6L8 4Zm0 0v16m8 0 3-3h-6l3 3Zm0 0V4",
  close: "M5 5l14 14M19 5 5 19",
  card: "M3 6h18v12H3zM3 10h18",
  wallet: "M4 6h15v13H4zM4 6l12-3v3M15 12h6v4h-6z",
  bank: "M3 9 12 4l9 5H3ZM5 10v7m5-7v7m4-7v7m5-7v7M3 20h18",
  external: "M13 5h6v6M19 5l-9 9M18 13v6H5V6h6",
  plusCircle: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 8v8M8 12h8",
  export: "M12 15V3m-4 4 4-4 4 4M5 13v6h14v-6",
  more: "M5 12h.01M12 12h.01M19 12h.01",
};

export function Icon({ name, size = 16, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
