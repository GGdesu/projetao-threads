import { UserContextProps, UserData } from "@/utils/dataInterface";
import { createContext, ReactNode, useContext, useState } from "react";



// inicializando o contexto
const UserContext = createContext<UserContextProps | undefined>(undefined);

//Hook para usar o contexto
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser deve ser usado dentro de um UserProvider');
    }
    return context;
};

// provedor de contexto
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}