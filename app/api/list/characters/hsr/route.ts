import { NextResponse } from "next/server";
import { LRUCache } from "lru-cache";

// Configuration du cache
const cache = new LRUCache<string, any>({
    max: 1, // nombre max d'éléments stockés
    ttl: 18000000, // durée de vie = 5 heures
});
const cacheKey = "charactersHSR";

// Attribue le nom du MC suivant son ID
const getMCName = (id: string): string | undefined => {
    switch (id) {
        case "8001":
            return "MC Destruction";
        case "8003":
            return "MC Preservation";
        case "8005":
            return "MC Imaginaire";
        case "8007":
            return "MC Souvenir";
        default:
            return undefined;
    }
};

const excludedCharacters = ["8002", "8004", "8006", "8008"]

export async function GET() {
    if (cache.has(cacheKey)) {
        return NextResponse.json(cache.get(cacheKey));
    }

    try {
        const res = await fetch("https://raw.githubusercontent.com/Mar-7th/StarRailRes/refs/heads/master/index_min/fr/characters.json");

        if (!res.ok) {
            return NextResponse.json({ error: `Erreur HTTP ${res.status}` }, { status: res.status });
        }

        const json = Object.values(await res.json());

        const data = json
            .filter((character: any) => !excludedCharacters.includes(character.id))
            .map((character: any) => ({
                id: character.id,
                name: getMCName(character.id) ?? character.name,
                icon: character.icon,
                preview: character.preview,
            }));

        cache.set(cacheKey, data);
        return NextResponse.json(data);

    } catch (error) {
        console.error("Fetch error:", error);
        return NextResponse.json({ error: "Une erreur réseau est survenue." }, { status: 500 });
    }
}
