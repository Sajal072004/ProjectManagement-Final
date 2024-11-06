import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import DashboardWrapper from "./DashboardWrapper";
import { ClerkProvider } from '@clerk/nextjs';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TaskBridge",
  description: "Project Management Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider>
          <DashboardWrapper>{children}</DashboardWrapper>
          <ToastContainer /> {/* Add ToastContainer here */}
        </ClerkProvider>
      </body>
    </html>
  );
}
