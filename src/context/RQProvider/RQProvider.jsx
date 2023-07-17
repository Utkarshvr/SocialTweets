"use client";

import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const RQProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools position="bottom-right" initialIsOpen />
  </QueryClientProvider>
);

export default RQProvider;
