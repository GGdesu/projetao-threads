export interface Corrida {
    id: string;
    entregador: string;
    coleta: string;
    previsaoEntrega: string;
    atrasada: boolean;
}

export interface UserData {
    cnh: string | null;
    cnpj: number;
    conta_bancaria: number;
    created_at: string;
    data_nascimento: string | null;
    endereco: string;
    entregador_id: string | null;
    id: string;
    lojista_id: string;
    nome: string | null;
    nome_loja: string | null;
    rg: string | null;
    telefone: number;
    tipo_usuario: number;
    veiculo: string | null;
}