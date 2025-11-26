import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Designer Portfolio",
    description: "Dither + Shaders Portfolio",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="preload"
                    href="/andrea.jpg"
                    as="image"
                    type="image/jpeg"
                />
            </head>
            <body className={`${outfit.className} antialiased`}>
                <ReduxProvider>
                    {children}
                </ReduxProvider>
            </body>
        </html>
    );
}
