"use client";

import React, { useCallback, useEffect, useMemo } from "react";
import { ThemeProvider as ThemeProviderMui } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import themeMui from "@/styles/themeMui.style";
import Layout1 from "./layout1/layout1";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";
import FullLayout from "./fullLayout/fullLayout";
import storagePlugin from "@/plugin/storage.plugin";
import storageKey from "@/constant/storage";
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";
import { persistor, store } from "@/stores/store";
import { PersistGate } from "redux-persist/integration/react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layouts = (props: LayoutProps) => {
  const { children } = props;
  const path = usePathname();
  const router = useRouter();

  const handleRedirectIsLogin = useCallback(() => {
    const resultKey = storagePlugin.isExist(storageKey.storageKey);

    if (!resultKey) {
      router.replace("/login");
    } else if (resultKey && path === "/login") {
      router.replace("/");
    }
  }, [path, router]);

  useEffect(() => {
    handleRedirectIsLogin();
  }, [handleRedirectIsLogin]);

  const renderLayout = useCallback(() => {
    const resultKey = storagePlugin.isExist(storageKey.storageKey);

    switch (path) {
      case "/login":
        return <FullLayout>{children}</FullLayout>;
      default:
        return <Layout1 isLogin={resultKey}>{children}</Layout1>;
    }
  }, [path, children]);

  const renderLayouts = useMemo(() => {
    const queryClient = new QueryClient();

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProviderMui theme={themeMui}>
            <QueryClientProvider client={queryClient}>
              <>
                {renderLayout()}
                <ToastContainer />
              </>
            </QueryClientProvider>
          </ThemeProviderMui>
        </PersistGate>
      </Provider>
    );
  }, [renderLayout]);

  return renderLayouts;
};

export default Layouts;
