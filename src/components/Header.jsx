import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { getServerSession } from "next-auth";

export default async function Header() {
  const session = await getServerSession();
  console.log({ session });
  return (
    <header className="py-2 px-5 flex items-center justify-between">
      <div className="flex gap-2">
        <div className="flex items-center gap-2">
          <Image src={logo} width={36} height={36} alt="Logo" />
          <p className="font-semibold text-lg text-sky-600 p-0.5 rounded-sm">
            SnapConnect
          </p>
        </div>
        {/* App Icon & Search Bar */}
      </div>
      <div className="flex gap-2">
        {/* All the links with Icons */}
        {session ? (
          <div className="me">
            {/* My avatar with drop down for profile, logout*/}
            {/* In drop down my avatar & name will be visible
                Below it: Btn => View Profile
            */}
            <Image
              src={session?.user?.image}
              width={32}
              height={32}
              alt="User"
            />
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              className="font-semibold text-md text-sky-500 "
              href="/api/auth/signin"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
