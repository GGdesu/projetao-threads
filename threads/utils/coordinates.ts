export interface Coordinates {
    lat: number;
    lon: number;
}

export const getCoordinates = async (address: string): Promise<Coordinates> => {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
    );
    const data = await response.json();
    return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
};

export const calculateDistance = (
    coord1: Coordinates,
    coord2: Coordinates
): number => {
    const R = 6371; // Raio da Terra em km
    const dLat = (coord2.lat - coord1.lat) * (Math.PI / 180);
    const dLon = (coord2.lon - coord1.lon) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(coord1.lat * (Math.PI / 180)) *
        Math.cos(coord2.lat * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distância em km
};

export const calcularTempoDeEntrega = (
    distancia: number,
    tempoDePreparo: string,
    velocidadeMedia: number = 30
): number => {
    let tempoDePreparoNum: number = 0;

    if (tempoDePreparo !== null) {
        tempoDePreparoNum = parseFloat(tempoDePreparo);
    }

    const tempoEntregaHoras = distancia / velocidadeMedia;
    const tempoEntregaMinutos = tempoEntregaHoras * 60;

    return tempoDePreparoNum + tempoEntregaMinutos;
};