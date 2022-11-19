import { EventData } from './util';

export const apiUrl = 'https://learningnextjs-39e4f-default-rtdb.europe-west1.firebasedatabase.app/events.json';

export const getAllEvents = async (): Promise<EventData[]> => {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const events = [];
    for (const key in data)
        events.push({ ...data[key], id: key });

    return events;
}

export const getFeaturedEvents = async (): Promise<EventData[]> => {
    const events = await getAllEvents();
    return events.filter(event => event.isFeatured);
}


export const getEventById = async (eventId: string): Promise<EventData> => {
    const events = await getAllEvents();
    return events.find(event => event.id === eventId);
}

export const getFilteredEvents = async (year: number, month: number) => (await getAllEvents())
    .filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    })
