import { getUser } from "@/lib/auth.session";
import { redirect } from "next/navigation";
import DashboardProvider from "../../context/DashboardProvider";
import { LogoutButton } from "@/components/LogoutButton";
import SidebarClient from "@/components/SidebarClient";
import { Toaster } from "@/components/ui/sonner";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) redirect("/auth/login");

  return (
    <DashboardProvider user={user}>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 border-r border-gray-300 flex flex-col pb-8 px-4">
          <div className="mb-10 flex flex-col">
            {/* <Link href={"/dashboard/settings"}>
              <Cog8ToothIcon className="h-6" />
            </Link> */}
            <div className="flex h-20 w-full bg-white rounded-lg shadow-md items-center mt-4 px-2">
              <div className="flex h-16 w-16 rounded-full border-2 border-gray-400 border-dotted items-center justify-center">
                <img
                  src={user.image as string}
                  alt={user.name}
                  className="w-12 h-12 rounded-full mx-auto"
                />
              </div>
              <p className="text-lg font-bold text-center ml-2">{user.name}</p>
            </div>
          </div>
          <SidebarClient />
          <div className="mt-auto text-xs pt-8">
            <LogoutButton />
            <p>© 2025 Characters Pick par Shalltear</p>
          </div>
        </aside>
        {/* Main content */}
        <main className="flex-1 p-8 overflow-hidden">{children}</main>
        <Toaster
          position="top-center"
          toastOptions={{ style: { backgroundColor: "white" } }}
        />
      </div>
    </DashboardProvider>
  );
}
