type Client = ReadableStreamDefaultController<Uint8Array>;

const clients = new Map<string, Client[]>();

export function addClient(uid: string, controller: Client) {
    const userClients = clients.get(uid) ?? [];
    userClients.push(controller);
    clients.set(uid, userClients);
}

export function removeClient(uid: string, controller: Client) {
    const userClients = clients.get(uid);
    if (!userClients) return;

    const filteredClients = userClients.filter(c => c !== controller);

    if (filteredClients.length > 0) {
        clients.set(uid, filteredClients);
    } else {
        clients.delete(uid);
    }
}

export function sendEventToUser(uid: string, data: unknown) {
    const userClients = clients.get(uid);
    if (!userClients) return;

    const encoder = new TextEncoder();
    const payload = `data: ${JSON.stringify(data)}\n\n`;

    for (const controller of userClients) {
        try {
            controller.enqueue(encoder.encode(payload));
        } catch (err) {
            console.error(`Erreur en envoyant un message SSE à ${uid}:`, err);
            removeClient(uid, controller);
        }
    }
}
