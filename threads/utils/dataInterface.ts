export interface Corrida {
    id: string;
    entregador_id: string | null;
    lojista_id: string | null;
    nome_lojista: string | null;
    nome_entregador: string | null;
    telefone_lojista: number | null;
    telefone_entregador: number | null;
    tempo_preparo: number | null;
    tempo_max_entrega: number | null;
    endereco_entrega: string | null;
    situacao_corrida: string | null;
    preco: number | null;
    avaliacao: number | null;
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

export interface UserContextProps{
    user: UserData | null;
    setUser: (user: UserData | null) => void;
    corridas: Corrida[] | null;
    setCorridas: (corridas: Corrida[] | null) => void;
}