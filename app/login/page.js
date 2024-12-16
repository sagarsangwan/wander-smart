import { SignIn } from '@/components/auth/signin-button'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { WanderSmartLogo } from '@/components/ui/logo'

export default async function LoginScreen() {
    const session = await auth()
    if (session?.user) {
        return redirect("/")
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full space-y-8 p-10 m-auto  rounded-xl shadow-md">
                <div className="text-center">
                    <WanderSmartLogo />
                    <h2 className="mt-6 text-xl md:text-3xl font-extrabold ">Sign in to your account
                    </h2>

                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Sign in with</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <SignIn />


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

