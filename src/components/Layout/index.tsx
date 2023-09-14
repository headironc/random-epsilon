"use client";

import { ReactNode } from "react";
import Image from "next/image";

export default function Layout({
    children,
    title,
}: {
    children: ReactNode;
    title: string;
}) {
    return (
        <div className="h-screen">
            <header className="flex h-24 rounded-sm border shadow-sm">
                <div className="flex w-96 items-center justify-center">
                    <Image
                        alt="logo"
                        src={`/brand.png`}
                        width={320}
                        height={64}
                        priority
                    />
                </div>
                <div className="flex h-full flex-1 items-center justify-center">
                    <h1 className="whitespace-nowrap text-7xl font-bold">
                        {title}
                    </h1>
                </div>
                <div className="w-96" />
            </header>
            <section className="h-[calc(100%-6rem)] p-6">{children}</section>
        </div>
    );
}
