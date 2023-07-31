import Header from "@/components/Header";
import "./globals.css";
import { Poppins } from "next/font/google";
import Provider from "@/context";
import CoreModal from "@/components/Modals/CoreModal";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Strings",
  description: "Stringing Moments Together",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Provider>
          <Header />
          <CoreModal />
          {children}
        </Provider>
      </body>
    </html>
  );
}
