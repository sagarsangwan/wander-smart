
"use client"

import TripForm from './trip-form';
import { Button } from "../ui/button";
import Link from "next/link";
function CreateTripButton() {
    return (
        <div className="">
            <Button>

                <Link href="/create-trip">Book Your Trip  </Link>
            </Button>



        </div>
    )
}

export default CreateTripButton
