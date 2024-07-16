import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { auth } from "@/lib/auth"

async function UserAvatar() {
    const session = await auth()
    return (
        <Avatar>
            <AvatarImage src={session?.user?.image} />
        </Avatar>

    )
}

export default UserAvatar
