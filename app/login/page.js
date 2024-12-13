import { SignIn } from '@/components/auth/signin-button'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default function LoginScreen() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full space-y-8 p-10  rounded-xl shadow-md">
                <div className="text-center">
                    {/* <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="App Logo"
                        width={100}
                        height={100}
                        className="mx-auto"
                    /> */}
                    <h2 className="mt-6 text-3xl font-extrabold ">Welcome to Our App</h2>
                    <p className="mt-2 text-sm text-gray-300">
                        Experience the future of productivity with our innovative platform.
                        Streamline your workflow, collaborate seamlessly, and achieve more.
                    </p>
                </div>
                <div className="text-center">
                    <SignIn />
                </div>
            </div>
        </div>
    )
}

