import axios from "axios";
import { Address } from "./dataInterface";

export const getAddressByCep = async (cep: string): Promise<Address>  => {

    const url = `https://viacep.com.br/ws/${cep}/json/`;
    let data: Address = {};

    await axios.get(url).then((res) => {
        data = res.data;
    }).catch((error) => {
        console.log(error + `; Cep nao encontrado. [${cep}]`);
    })

    return data;
}