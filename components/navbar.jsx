import { ModeToggle } from "./mode-toggle";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { SignIn } from "./auth/signin-button";
import UserAvatar from "./auth/user-avatar";
import { Badge } from "./ui/badge";
import { WanderSmartLogo } from "./ui/logo";

export default async function Navbar() {
  const session = await auth();
  return (
    <header className={`w-full bg-background px-4 py-3 md:px-6 `}>
      <div className=" mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <WanderSmartLogo className="w-40 h-auto sm:w-22" />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="/my-trips"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            prefetch={false}
          >
            My Itineraries
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            prefetch={false}
          >
            Pricing
          </Link>
          <ModeToggle />
          {!session && <SignIn />}
        </nav>
        <div className="flex items-center gap-4">
          {session?.user &&
            (session?.user?.balance === 0 && session?.user?.freePlanUsed < 3 ? (
              <Badge variant="outline">
                {`${3 - session?.user?.freePlanUsed} token`}
              </Badge>
            ) : (
              <Badge variant="secondary">
                {" "}
                {session?.user?.balance} token left{" "}
              </Badge>
            ))}

          {session && <UserAvatar />}
          {/* {session ? <UserAvatar /> : <SignIn />} */}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-4 p-4">
                <Link
                  href="/"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  prefetch={false}
                >
                  Home
                </Link>
                <Link
                  href="/my-trips"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  prefetch={false}
                >
                  My Itineraries
                </Link>
                <Link
                  href="/pricing"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  prefetch={false}
                >
                  Pricing
                </Link>
                <ModeToggle />
                {session ? <UserAvatar /> : <SignIn />}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// export function Navbar() {

//     return (
//         (<header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
//             <Sheet>
//                 <SheetTrigger asChild>
//                     <Button variant="outline" size="icon" className="lg:hidden">
//                         <MenuIcon className="h-6 w-6" />
//                         <span className="sr-only">Toggle navigation menu</span>
//                     </Button>
//                 </SheetTrigger>
//                 <SheetContent side="left">
//                     <Link href="/" className=" text-purple-500 font-semibold mr-6 hidden lg:flex" prefetch={false}>
//                         Wander Smart
//                         <span className="sr-only">wander Smart</span>
//                     </Link>
//                     <ModeToggle />
//                     <div className="grid gap-2 py-6">

//                         {/* <Link
//               href="/"
//               className="flex w-full items-center py-2 text-lg font-semibold"
//               prefetch={false}>
//               Home
//             </Link>
//             <Link
//               href="#"
//               className="flex w-full items-center py-2 text-lg font-semibold"
//               prefetch={false}>
//               About
//             </Link>
//             <Link
//               href="#"
//               className="flex w-full items-center py-2 text-lg font-semibold"
//               prefetch={false}>
//               Services
//             </Link>
//             <Link
//               href="#"
//               className="flex w-full items-center py-2 text-lg font-semibold"
//               prefetch={false}>
//               Contact
//             </Link> */}
//                     </div>
//                 </SheetContent>
//             </Sheet>
//             <Link href="/" className="text-purple-500 font-semibold	 mr-6 hidden lg:flex" prefetch={false}>
//                 Wander Smart
//                 <span className="sr-only">wander Smart</span>
//             </Link>
//             <nav className="ml-auto hidden lg:flex gap-6">
//                 <ModeToggle />
//                 {/* <Link
//           href="/"
//           className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
//           prefetch={false}>
//           Home
//         </Link>*/}
//             </nav>
//         </header>)
//     );
// }
