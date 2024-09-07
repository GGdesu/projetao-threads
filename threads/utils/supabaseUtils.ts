import { UserData } from "./dataInterface";

import { supabase } from "./supabase"

export async function getActiveUser() {
    try {
        //const user = (await supabase.auth.getUser()).data.user?.id
        const { data: { user }, error } = await supabase.auth.getUser()

        if (error) {
            console.error("Erro ao obter o usuário:", error);
            return null;
        }

        if (user) {
            console.log("Usuário ativo resgatado com sucesso:", user.id);
            return user.id;
        } else {
            console.log("Nenhum usuário logado.");
            return null;
        }


    } catch (error) {
        console.log("error ao tentar pegar o id o usuario ativo: ", error)
    }
}

export async function getActiveUserData() {
    try {
        const { data: user, error } = await supabase
            .from('usuario')
            .select('*')
            .eq("lojista_id", await getActiveUser())

        if (error) {

            console.log("erro ao obter as informações do Lojista: ", error)
            return null
        }
        if (user && user[0] == undefined) {
            try {
                const { data: user, error } = await supabase
                    .from('usuario')
                    .select('*')
                    .eq('entregador_id', await getActiveUser())


                if (error) {

                    console.log("erro ao obter as informações do entregador: ", error)
                    return null
                }

                if (user) {
                    console.log("informações do usuário resgatadas com sucesso: ", user[0])
                    return user[0]
                } else {
                    console.log("nenhum usuario logado")
                    return null
                }

            } catch (error) {
                console.log("Erro ao tentar resgatar o entregador:", error)
            }
        }
        if (user) {
            console.log("informações do usuário resgatadas com sucesso: ", user[0])
            return user[0]
        } else {
            console.log("nenhum usuario logado")
            return null
        }

    } catch (error) {
        console.log("Erro ao tentar resgatar o entregador:", error)
    }
}


//testar função
export async function updateActiveUser(data: { [key: string]: any }, tipo_conta_coluna: string) {
    try {
        const userId = await getActiveUser()

        if (!userId) {
            console.log("Não foi possivel obter o ID do usuário")
        }

        const { error } = await supabase
            .from('usuario')
            .update(data)
            .eq(tipo_conta_coluna, userId)

        if (error) {
            console.log("erro ao tentar atualizar as informações do usuario", error)
        } else {
            console.log("informações atualizadas com sucesso")
        }

    } catch (error) {
        console.log("Foi captado um erro: ", error)
    }

}

//vai pegar todas as infos de corridas relacionada ao usuario
export async function getDelivers(nome_coluna: string, id_usuario: string) {
    try {
        const { data: entregas, error } = await supabase
            .from("entrega")
            .select("*")
            .eq(nome_coluna, id_usuario)

        if (error) {
            console.log("não foi possivel obter as entregas: ", error)
        } else {
            console.log("entregas obtidas com sucesso")
            return entregas
        }

    } catch (error) {
        console.log("foi encontrado um erro ao executar codigo: ", error)
    }
}

export async function getActiveDelivers() {
    try {

        const { data: entregas, error } = await supabase
            .from('entrega')
            .select('*')
            .eq("situacao_corrida", "ativa")

        if (error) {
            console.log("não foi possivel obter as entregas: ", error)
        } else {
            console.log("entregas obtidas com sucesso")
            return entregas
        }

    } catch (error) {
        console.log("foi encontrado um erro ao executar codigo: ", error)
    }
}

export async function updateActiveDelivers() {

}

export async function acceptActiveDelivers(id_entrega: string) {

    try {
        //lembrar de colocar manualmente para entregador
        const userData: UserData = await getActiveUserData()

        const { error } = await supabase
            .from('entrega')
            .update({ nome_entregador: userData.nome, telefone_entregador: userData.telefone, entregador_id: userData.entregador_id })
            .eq('id', id_entrega)

        if (error) {
            console.log("Erro ao tentar atualizar informação da entrega: ", error)
        } else {
            console.log("Entrega aceita com sucesso")

        }


    } catch (error) {
        console.log("erro capturado ao tentar aceitar o delivery: ", error)
    }
}