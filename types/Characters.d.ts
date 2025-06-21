interface CharacterHSR {
    id: string;
    name: string;
    icon: string;
    preview: string;
}

interface HSRPickData {
    data: CharacterHSR[];
    options: any;
}

export type { CharacterHSR, HSRPickData };