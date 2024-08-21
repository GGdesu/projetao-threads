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
            
        if(error){
            console.log("erro ao obter as informações do usuario: ", error)
            return null
        }

        if(user){
            console.log("informações do usuário resgatadas com sucesso: ", user)
            return user
        }else {
            console.log("nenhum usuario logado")
            return null
        }
        
    } catch (error) {
        console.log("Erro ao tentar resgatar o usuario:", error)
    }
}