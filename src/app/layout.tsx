import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "macOS 27",
  description: "macOS 27 Simulator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full w-full overflow-hidden">
        {children}
      </body>
    </html>
  );
}