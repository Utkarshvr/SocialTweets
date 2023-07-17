import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import UserMenu from "./User/UserMenu/UserMenu";

export default function Header() {
  return (
    <header className="py-2 px-5 flex items-center justify-between">
      <div className="flex gap-2">
        <Link href="/feed" className="flex items-center gap-2">
          <Image src={logo} width={36} height={36} alt="Logo" />
          <p className="font-semibold text-lg text-white p-0.5 rounded-sm">
            SocialTweets
          </p>
        </Link>
        {/* App Icon & Search Bar */}
      </div>
      <div className="flex gap-2">
        {/* All the links with Icons */}
        <div className="me">
          {/* My avatar with drop down for profile, logout*/}
          {/* In drop down my avatar & name will be visible
                Below it: Btn => View Profile
            */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
