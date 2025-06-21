"use client";
import { CameraIcon, HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SidebarClient() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-4">
      <Link
        href="/dashboard"
        className={
          pathname === "/dashboard"
            ? "flex font-bold bg-white rounded-lg px-2 py-1 hover:cursor-default border-gray-200 border"
            : "flex hover:text-indigo-500 hover:font-bold px-2 py-1 font-semibold transition-colors"
        }
        aria-current={pathname === "/dashboard" ? "page" : undefined}
      >
        <HomeIcon className="h-6 w-6 mr-2" />
        Accueil
      </Link>
      <Link
        href="/dashboard/HSR-Pick"
        className={
          pathname.startsWith("/dashboard/HSR-Pick")
            ? "flex font-bold bg-white rounded-lg px-2 py-1 hover:cursor-default border-gray-200 border"
            : "flex hover:text-indigo-500 hover:font-bold px-2 py-1font-semibold transition-colors"
        }
        aria-current={
          pathname.startsWith("/dashboard/HSR-Pick") ? "page" : undefined
        }
      >
        <CameraIcon className="h-6 w-6 mr-2" />
        HSR Pick
      </Link>
    </nav>
  );
}

export default SidebarClient;
