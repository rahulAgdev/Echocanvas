import type { Metadata } from "next";
import "./globals.css";
import { Work_Sans } from "next/font/google";
import { Room } from "./Room";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "600", "700"],
});
export const metadata: Metadata = {
  title: "Figma Clone",
  description:
    "A minimalist figma close using fabric.js and liveblocks for real time collaboration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.className} bg-primary-grey-200`}>
        <Room>{children}</Room>
      </body>
    </html>
  );
}
