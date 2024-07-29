import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import TripForm from './trip-form';
import { Button } from "../ui/button";
function CreateTripButton() {
    return (
        <div className="">
            <Dialog>
                <DialogTrigger>
                    <Button className="bg-primary flex justify-center group/modal-btn">
                        Book Your Trip
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <p className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                        Book your trip
                    </p>
                    <TripForm />
                </DialogContent>
            </Dialog>


        </div>
    )
}

export default CreateTripButton
