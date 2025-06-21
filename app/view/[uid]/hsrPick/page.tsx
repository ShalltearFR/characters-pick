/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { CharacterHSR, HSRPickData } from "@/types/Characters";
import { CDN } from "@/utils/CDN";

const HSRPickView = () => {
  const { uid } = useParams();
  const [userData, setUserData] = useState<undefined | HSRPickData>(undefined);
  const charactersList = useRef<undefined | CharacterHSR[]>(undefined);

  const fetchUpdates = () => {
    if (!uid || !charactersList.current) return;

    const currentCharacters = charactersList.current;

    fetch(`/api/user/HSRPick?uid=${uid}`)
      .then((res) => res.json())
      .then((json: { data: string[]; options: any }) => {
        const characters = json.data
          .map((id: string) => currentCharacters.find((el) => el.id === id))
          .filter((el): el is CharacterHSR => el !== undefined);

        const newData = {
          data: characters,
          options: json.options,
        };
        setUserData(newData);
      });
  };

  // Charger la liste des personnages
  useEffect(() => {
    fetch("/api/list/characters/hsr")
      .then((res) => res.json())
      .then((data) => {
        charactersList.current = data;
        fetchUpdates(); // Appelé une fois la liste chargée
      });
  }, []);

  // Gérer les SSE et rechargements au changement de uid
  useEffect(() => {
    if (!uid || !charactersList.current) return;
    const eventSource = new EventSource(`/api/events?uid=${uid}`);

    eventSource.onmessage = (event) => {
      const { type } = JSON.parse(event.data);
      if (type === "updateHSRPick") {
        fetchUpdates();
        console.log("🔔 Notification reçue :", type);
      }
    };

    eventSource.onerror = (e) => {
      if (eventSource.readyState === EventSource.CLOSED) {
        console.log("✅ Connexion SSE fermée proprement");
      } else {
        console.error("SSE error", e);
      }
    };

    eventSource.onopen = () => {
      console.log("Connexion SSE ouverte");
    };

    return () => eventSource.close();
  }, [uid, charactersList.current]);

  return (
    <div className="flex mt-10 relative h-64">
      {userData?.data
        .map((c, i) => {
          if (i > 24) return null;
          const total = userData.data.length > 24 ? 24 : userData.data.length;
          const center = Math.floor(total / 2);
          const offset = 70;
          const angleStep = 5;

          return (
            <div
              key={i}
              className="w-28 h-full overflow-hidden bg-black rounded-lg absolute top-0 left-1/2"
              style={{
                transform: `translateX(${(i - center) * offset}px) rotate(${
                  (i - center) * angleStep
                }deg)`,
                zIndex: i,
                boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                transition: "transform 0.3s ease",
              }}
            >
              <img
                src={`${CDN}/${c.icon}`}
                className="h-full w-auto object-cover object-center"
                alt={`Card ${i}`}
              />
            </div>
          );
        })
        .filter((el) => el !== null)}
    </div>
  );
};

export default HSRPickView;
