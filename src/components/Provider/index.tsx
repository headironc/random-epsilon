"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function Provider({ children }: { children: React.ReactNode }) {
    const [client] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: false,
                    },
                },
            }),
    );

    return (
        <QueryClientProvider client={client}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
