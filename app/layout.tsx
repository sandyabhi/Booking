import "./globals.css";
import { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modal/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modal/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modal/RentModal";
import SearchModal from "./components/modal/SearchModal";

export const metadata: Metadata = {
  title: "Booking.com",
  description: "Booking your Hotel",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />

        <SearchModal />
        <RentModal />
        <LoginModal />
        <RegisterModal />

        <Navbar currentUser={currentUser} />

        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
