import React, { createContext, type ReactNode } from "react";

interface ForContext {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>

}

interface CommonProps {
    children: ReactNode
}
export const CommonContext = createContext<ForContext | undefined>(undefined);



const Common = ({ children }: CommonProps) => {
    const [loading, setLoading] = React.useState<boolean>(false)

    const allContext: ForContext = {
        loading,
        setLoading
    }
    return (
        <>
            <CommonContext.Provider value={allContext}>
                {children}
            </CommonContext.Provider>
        </>
    )
}


export default Common