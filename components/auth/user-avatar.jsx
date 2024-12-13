import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { auth } from "@/lib/auth"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SignOut } from "./signout-button"

async function UserAvatar() {
    const session = await auth()
    return (
        <div>

            <DropdownMenu>
                <DropdownMenuTrigger>  <Avatar>
                    <AvatarImage src={session.user.image} />
                </Avatar></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                    <DropdownMenuItem><SignOut /></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

    )
}

export default UserAvatar
