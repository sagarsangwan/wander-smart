import React from "react";
import { WanderSmartLogo } from "@/components/ui/logo";
import Link from "next/link";
function Footer() {
  return (
    <footer className="mt-10 px-8 ">
      <div className="flex justify-between ">
        <div>
          <WanderSmartLogo className="w-40 h-auto sm:w-30" />
        </div>
        <ul className="flex gap-3 flex-col md:flex-row">
          <li>
            <Link href={"/terms"} className="text-red-500">
              Terms
            </Link>
          </li>
          <li>
            <Link className="text-red-500" href={"/privacy"}>
              Privacy
            </Link>
          </li>
          <li>
            <Link href={"/contact-us"} className="text-red-500">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      <p className="w-full text-center py-8">
        © 2024 <span className="text-red-500">WanderSmart.</span> All rights
        reserved.
      </p>
    </footer>
  );
}

export default Footer;
