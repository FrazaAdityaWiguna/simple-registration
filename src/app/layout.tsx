import "@/styles/globals.css";
import Layouts from "@/layouts/layouts";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple Project",
  description: "Project for Registration User",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layouts>{children}</Layouts>
      </body>
    </html>
  );
}
