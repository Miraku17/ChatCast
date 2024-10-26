import type { Metadata } from "next";
import { Work_Sans, League_Spartan } from 'next/font/google';
import "./globals.css";
import Navbar from "./components/navbar/navBar";
import Footer from "./components/footer/footer";
const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
});

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  variable: '--font-league-spartan',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ChatCast",
  description: "Convert your chats to PDF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html lang="en" className={`${workSans.variable} ${leagueSpartan.variable}`}>
<body
        className="font-sans antialiased bg-[#EFE7F7]"
      >
        <Navbar />
        <main className="max-w-7xl mx-auto">{children}</main>
      </body>
    </html>
  );
}