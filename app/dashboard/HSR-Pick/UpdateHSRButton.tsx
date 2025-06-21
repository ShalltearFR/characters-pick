"use client";
import { useState } from "react";
import { toast } from "sonner";

export function UpdateHSRButton({ newHSRList }: { newHSRList: string[] }) {
  const [isDisabled, setIsDisabled] = useState(false);

  const notify = (
    type: "success" | "error",
    color: string,
    message: string
  ) => {
    toast[type](message, {
      style: {
        backgroundColor: color,
        fontSize: "1.2rem",
      },
    });
  };

  const handleClick = async () => {
    setIsDisabled(true);

    try {
      const res = await fetch("/api/user/HSRPick", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newHSRList }),
      });

      if (res.ok) {
        notify("success", "oklch(72.3% .219 149.579)", "Données mises à jour");
        setTimeout(() => setIsDisabled(false), 5000);
      } else {
        if (res.status === 429) {
          notify(
            "error",
            "red",
            "Trop de requêtes, veuillez réessayer dans quelques secondes"
          );
        } else {
          notify("error", "red", "Erreur lors de la mise à jour des données");
        }

        setIsDisabled(false);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      notify("error", "red", "Erreur réseau");
      setIsDisabled(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className="text-center text-md text-white bg-green-500 py-2 px-4 border border-green-600 font-bold rounded-full mt-2 cursor-pointer disabled:bg-gray-500 disabled:cursor-default disabled:border-gray-300"
    >
      Mettre à jour
    </button>
  );
}
