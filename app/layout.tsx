import type { Metadata } from "next";
import "./globals.css";
import "../features/payments/payments.css";

export const metadata: Metadata = {
  title: "Payments | Acme Studio",
  description: "View and manage your payments.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
