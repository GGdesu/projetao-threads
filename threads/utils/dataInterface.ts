export interface Corrida {
    id: string;
    created_at: string;
    entregador_id: string | null;
    lojista_id: string | null;
    nome_lojista: string | null;
    nome_entregador: string | null;
    telefone_lojista: number | null;
    telefone_entregador: number | null;
    tempo_preparo: number | null;
    previsao_entrega: string | null;
    endereco_entrega: string | null;
    situacao_corrida: string | null;
    preco: number | null;
    avaliacao: number | null;
    coleta: string | null;
    rua: string | null;
    numero: number | null;
    bairro: string | null;
    cidade: string | null;
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
    rua: string | null;
    numero: number | null;
    bairro: string | null;
    cidade: string | null;
}

export interface UserContextProps {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
    corridas: Corrida[] | null;
    setCorridas: (corridas: Corrida[] | null) => void;
}

export interface Address {
    cep?: string;
    logradouro?: string;
    complemento?: string;
    unidade?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
    estado?: string;
    regiao?: string;
    ibge?: string;
    gia?: string;
    ddd?: string;
    siafi?: string;
}
