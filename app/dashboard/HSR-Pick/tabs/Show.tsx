import { useSession } from "@/lib/auth.client";
import { useEffect, useState } from "react";

export const Show = () => {
  const [uid, setUid] = useState<string>("");
  const [areCharacters, setAreCharacters] = useState<boolean>(false);

  const session = useSession();
  useEffect(() => setUid(session?.data?.session.userId ?? ""), [session]);

  useEffect(() => {
    fetch(`/api/user/HSRPick?uid=${uid}`)
      .then((res) => res.json())
      .then((json) => {
        if (Object.keys(json).length === 0) setAreCharacters(false);
        else setAreCharacters(true);
      });
  }, [uid]);

  if (uid === "") return <p>Chargement...</p>;
  if (!areCharacters) return <p>Pas de personnages encore définis</p>;

  return (
    <div>
      <p>
        Url pour la source OBS :{" "}
        <a
          className="font-medium hover:underline hover:text-blue-500 hover:font-bold"
          href={`https://streamtools.shalltear.fr/view/${uid}/hsrPick`}
          target="_blank"
          rel="noreferrer"
        >
          https://streamtools.shalltear.fr/view/{uid}/hsrPick
        </a>
      </p>
      <p>Hauteur minimale : 330px</p>
      <p>Nombre maximale de personnages : 25</p>
      {/* <iframe
        src={`http://localhost:3000/view/${uid}/hsrPick`}
        width="100%"
        height="330px"
      ></iframe> */}
    </div>
  );
};
