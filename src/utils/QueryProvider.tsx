'use client'
import React, { useState } from "react";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function QueryProvider ({ children }: any) {
  // 참조 동일성 유지를 위해 useState로 생성
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <ReactQueryStreamedHydration>
        {children}
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}