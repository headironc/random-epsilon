"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

const navigations: {
    text: string;
    href: string;
}[] = [
    {
        href: "/",
        text: "首页",
    },
    {
        href: "/east-courtyard/herbal-pharmacy",
        text: "东院草药房",
    },
    {
        href: "/east-courtyard/pharmacy",
        text: "东院西药房",
    },
    {
        href: "/west-courtyard/herbal-pharmacy",
        text: "西院草药房",
    },
    {
        href: "/west-courtyard/pharmacy",
        text: "西院西药房",
    },
];

export default function Page() {
    const pathname = usePathname();

    return (
        <main className="flex min-h-screen items-center justify-center">
            <div>
                <NavigationMenu>
                    <NavigationMenuList>
                        {navigations.map(({ href, text }, index) => (
                            <NavigationMenuItem key={index}>
                                <Link href={href} legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                        active={pathname === href}
                                    >
                                        {text}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </main>
    );
}
