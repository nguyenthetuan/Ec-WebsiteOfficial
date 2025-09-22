"use client";

import { useState, useEffect } from "react";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { QuickViewModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ReduxProvider } from "@/redux/provider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";
import { ModalProvider } from "../context/ModalContext";
import { NextIntlClientProvider } from "next-intl";
import { usePathname } from "next/navigation";
import jpMessages from "@/locales/jp.json";
import viMessages from "@/locales/vi.json";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const messagesMap: Record<string, any> = {
  en: jpMessages,
  vi: viMessages,
};
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en"; // lấy locale từ url, ví dụ /vi/home

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body>
        {loading ? (
          <PreLoader />
        ) : (
          <NextIntlClientProvider
            messages={messagesMap[locale]}
            locale={locale}
          >
            <QueryClientProvider client={queryClient}>
              <ReduxProvider>
                <ModalProvider>
                  <CartModalProvider>
                    <QuickViewModalProvider>
                      <PreviewSliderProvider>
                        <Header />
                        {children}
                        <QuickViewModal />
                        <CartSidebarModal />
                        <PreviewSliderModal />
                      </PreviewSliderProvider>
                    </QuickViewModalProvider>
                  </CartModalProvider>
                </ModalProvider>
              </ReduxProvider>
              <ScrollToTop />
              <Footer />
            </QueryClientProvider>
          </NextIntlClientProvider>
        )}
      </body>
    </html>
  );
}
