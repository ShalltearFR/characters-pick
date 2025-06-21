"use client";
import { useUser } from "../../context/UserContext";
import { Card } from "@/components/ui/card";

// Détection du domaine parent pour l'iframe Twitch
const parentDomain = process.env.NEXT_PUBLIC_DOMAINE;

export default function Dashboard() {
  const user = useUser();

  return (
    <menu className="flex m-auto h-full items-center justify-center">
      <Card className="w-4xl text-center text-4xl font-semibold">
        Bienvenue {user!.name} !
        <iframe
          src={`https://player.twitch.tv/?channel=${
            user!.name
          }&parent=${parentDomain}&autoplay=true&muted=true`}
          width="640"
          height="360"
          allowFullScreen
          className="my-4 rounded mx-auto"
        />
      </Card>
    </menu>
  );
}
