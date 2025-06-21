"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth.client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  return (
    <Button
      className="text-lg font-semibold w-52 mx-auto border mb-5 cursor-pointer"
      variant="secondary"
      onClick={async () => {
        await signOut();
        router.push("/");
      }}
    >
      Deconnexion
    </Button>
  );
}
