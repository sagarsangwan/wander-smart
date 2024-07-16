
import { signIn } from "@/lib/auth"
import { Button } from "../ui/button"
export function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("google")
            }}
        >
            <Button size="sm" type="submit">Signin</Button>
        </form>
    )
} 