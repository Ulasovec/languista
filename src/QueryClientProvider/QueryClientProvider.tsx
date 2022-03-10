import {QueryClient,QueryClientProvider} from "react-query";
import React, {ReactNode} from "react";


interface AppProviderProps {
    children: ReactNode
}

export const QueryProvider = ({children}:AppProviderProps)=> {
    const queryClient = new QueryClient();
    return   <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}