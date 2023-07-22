import Header from "@/components/Header";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Provider from "@/context";
import CoreModal from "@/components/Modals/CoreModal";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "SocialTweets",
  description: "Create by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Provider>
          <Header />
          <CoreModal />
          {children}
        </Provider>
      </body>
    </html>
  );
}
