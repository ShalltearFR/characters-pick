"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { signIn } from "@/lib/auth.client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { redirect } from "next/navigation";

interface SignInProps {
  user: object | undefined;
}

export default function SignIn({ user }: SignInProps) {
  if (user) redirect("/dashboard");

  const [loading, setLoading] = useState(false);
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-center">
          Connexion
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div
            className={cn(
              "w-full gap-2 flex items-center",
              "justify-between flex-col"
            )}
          >
            <Button
              variant="outline"
              className={cn("w-full gap-2 cursor-pointer")}
              disabled={loading}
              onClick={async () => {
                await signIn.social(
                  {
                    provider: "twitch",
                    callbackURL: "/dashboard",
                  },
                  {
                    onRequest: () => {
                      setLoading(true);
                    },
                    onResponse: () => {
                      setLoading(false);
                    },
                    onError: (ctx) => {
                      toast.error(ctx.error.message);
                    },
                  }
                );
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z"
                ></path>
              </svg>
              Se connecter via Twitch
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
