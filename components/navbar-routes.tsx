"use client";

import { RedirectToSignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
export const NavbarRoutes = () => {

    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isPlayerPage = pathname?.startsWith("/courses");
    const isSearchPage = pathname === "/search";

    return (
        <>
        {isSearchPage && (
            <div className="md:block hidden">
                <SearchInput />
            </div>
        )}
        <div className="flex gap-x-2 ml-auto">

            {
                isTeacherPage || isPlayerPage ? (
                    <Link href="/">
                        <Button size={"sm"} variant="ghost">
                            <LogOut className="h-4 w-4 mr-2" />
                            Exit
                        </Button>
                    </Link>
                ) : (
                    <Link href="/teacher/courses">
                        <Button size="sm" variant="ghost" >
                            Teacher Mode
                        </Button>
                    </Link>
                )
            }
            <SignedIn>
                <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </div>
        </>
    )
}