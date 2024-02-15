"use client";

import { Main } from "@/layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

type Props = {
  children: React.ReactNode;
};

const queryclient = new QueryClient();

export const AppProvider: React.FC<Props> = ({ children }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryclient}>
        <RecoilRoot>
          <Main>{children}</Main>
        </RecoilRoot>
      </QueryClientProvider>
    </SessionProvider>
  );
};
