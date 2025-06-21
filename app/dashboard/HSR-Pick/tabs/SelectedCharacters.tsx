"use client";
import { CharacterHSR } from "@/types/Characters";
import { useEffect, useState } from "react";
import { SkeletonCard } from "../SkeletonCard";
import { CDN } from "@/utils/CDN";
import { ArchiveX, Trash2Icon } from "lucide-react";
import { UpdateHSRButton } from "../UpdateHSRButton";

export const SelectedCharacters = () => {
  const [characters, setCharacters] = useState<CharacterHSR[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<CharacterHSR[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const [charRes, pickRes] = await Promise.all([
        fetch("/api/list/characters/hsr"),
        fetch(`/api/user/HSRPick`),
      ]);

      const charactersData = await charRes.json();
      setCharacters(charactersData);

      const picksData = await pickRes.json();

      if (JSON.stringify(picksData) === "{}") {
        setSelectedCharacters([]);
      } else {
        const selected =
          picksData.data
            .map((id: string) =>
              charactersData.find((c: CharacterHSR) => c.id === id)
            )
            .filter((c: any): c is CharacterHSR => c !== undefined) ?? [];

        setSelectedCharacters(selected);
      }
    };

    fetchData();
  }, []);

  const moveItemUp = (index: number) => {
    if (index === 0) return;
    setSelectedCharacters((prev) => {
      const newArr = [...prev];
      [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
      return newArr;
    });
  };

  const moveItemDown = (index: number) => {
    setSelectedCharacters((prev) => {
      if (index === prev.length - 1) return prev;
      const newArr = [...prev];
      [newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]];
      return newArr;
    });
  };

  if (characters.length === 0) {
    return <SkeletonCard />;
  }

  return (
    <div className="grid grid-cols-[75%_25%] divide-x">
      {/* Liste de gauche */}
      <section className="grid grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3 gap-5 px-4 h-[calc(100vh-112px)] overflow-y-auto">
        {characters
          .filter((c) => !selectedCharacters.find((sc) => sc.id === c.id))
          .map((char) => (
            <div
              key={char.id}
              className="flex gap-5 items-center h-24 bg-white rounded shadow p-2 "
            >
              <img
                src={`${CDN}/${char.icon}`}
                alt={char.name}
                className="w-24 h-24"
              />
              <div className="flex flex-col justify-center items-center mx-auto">
                <span className="text-center">{char.name}</span>
                <button
                  onClick={() =>
                    setSelectedCharacters((prev) => [...prev, char])
                  }
                  className="text-center text-sm text-blue-600 bg-green-200 p-2 font-bold rounded-full hover:underline mt-2 cursor-pointer"
                >
                  Ajouter
                </button>
              </div>
            </div>
          ))}
      </section>

      {/* Liste de droite */}
      <section className="flex flex-col px-4 space-y-2 h-[calc(100vh-112px)] overflow-y-auto">
        <div className="grid grid-cols-[50%_50%] items-center">
          <h2 className="font-bold">Liste affichées</h2>
          <div className="flex justify-end w-full">
            <button
              className="group relative flex h-10 w-10 items-center justify-end overflow-hidden rounded-full bg-red-500 text-white font-medium transition-all duration-300 origin-right 2xl:hover:w-36 cursor-pointer"
              onClick={() => setSelectedCharacters([])}
            >
              {/* Texte animé */}
              <span className="absolute right-12 whitespace-nowrap translate-x-full opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 hidden 2xl:block">
                Vider liste
              </span>

              {/* Icône fixe à droite */}
              <div className="p-2 z-10 bg-red-500">
                <ArchiveX />
              </div>
            </button>
          </div>
        </div>

        {selectedCharacters.map((char, index) => (
          <div
            key={`Selected${char.id}+${index}`}
            className="flex justify-between items-center"
          >
            <span>{char.name}</span>
            <div className="flex space-x-1">
              <button
                onClick={() => moveItemUp(index)}
                disabled={index === 0}
                className="text-xl text-gray-600 hover:text-black disabled:opacity-30 cursor-pointer"
              >
                ↑
              </button>
              <button
                onClick={() => moveItemDown(index)}
                disabled={index === selectedCharacters.length - 1}
                className="text-xl text-gray-600 hover:text-black disabled:opacity-30 cursor-pointer"
              >
                ↓
              </button>
              <button
                onClick={() =>
                  setSelectedCharacters((prev) =>
                    prev.filter((c) => c.id !== char.id)
                  )
                }
                className="text-xs text-red-500 hover:underline ml-2 cursor-pointer"
              >
                <Trash2Icon />
              </button>
            </div>
          </div>
        ))}

        <div className="mt-auto mx-auto">
          <UpdateHSRButton newHSRList={selectedCharacters.map((c) => c.id)} />
        </div>
      </section>
    </div>
  );
};
