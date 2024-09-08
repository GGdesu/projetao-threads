import { useUser } from "@/context/userContext";
import { getDelivers } from "./supabaseUtils";

export const formatarDataHoraISO = (created_at: string): string => {
    const data = new Date(created_at);

    // Verifica se a data é válida
    if (isNaN(data.getTime())) {
        console.log(created_at)
        return "Data inválida";
    }

    // Formatar a data e a hora no formato desejado
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const ano = data.getUTCFullYear();

    const horas = String(data.getUTCHours()).padStart(2, '0');
    const minutos = String(data.getUTCMinutes()).padStart(2, '0');
    console.log(`${dia}/${mes}/${ano} às ${horas}:${minutos}`)

    return `${dia}/${mes}/${ano} às ${horas}:${minutos}`;

    // const data = new Date(created_at);

    // // Formatar a data e a hora no formato desejado
    // const dia = String(data.getDate()).padStart(2, '0');
    // const mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    // const ano = data.getFullYear();

    // const horas = String(data.getHours()).padStart(2, '0');
    // const minutos = String(data.getMinutes()).padStart(2, '0');
    // console.log(`${dia}/${mes}/${ano} às ${horas}:${minutos}`)

    // return `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
}

