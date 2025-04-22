import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TwitterTraverse",
  description: "It's a small world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=""
      >
        {children}
      </body>
    </html>
  );
}
