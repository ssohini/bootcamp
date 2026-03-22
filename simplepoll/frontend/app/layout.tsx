import type { Metadata } from "next";
import "./globals.css";
import LenisWrapper from "@/components/LenisWrapper";

export const metadata: Metadata = {
  title: "SimplePoll - Decentralized Voting on Stellar",
  description: "Create and participate in polls using Soroban smart contracts on the Stellar network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-inter bg-neo-white text-neo-black">
        <LenisWrapper>
          {children}
        </LenisWrapper>
      </body>
    </html>
  );
}
