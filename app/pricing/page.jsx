"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { WanderSmartLogo } from '@/components/ui/logo'
import useTokenCalculator from '@/hooks/useTokenCalculator'
function Page() {
    const { tokens, handleIncrement, handleDecrement, total } = useTokenCalculator()
    // const [tokens, setTokens] = useState(1)
    return (
        <div className='h-screen flex'>
            <div className='mx-auto max-w-md w-full'>
                <Card className=" ">
                    <CardHeader className="bg-rose">
                        <CardTitle className="text-3xl">WanderSmart Tokens</CardTitle>
                        <CardDescription>Fuel your adventures</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center text-center">
                        <div>
                            <div>
                                <WanderSmartLogo />
                            </div>
                            <div className='justify-center mt-10'>
                                <p className="text-xl">
                                    1 Token = 20 Rupees
                                    <br />
                                    <span className='text-slate-600 text-sm'>
                                        But 10 tokens and get 10% off
                                        <br />
                                        But 20 tokens and get 15% off
                                    </span>

                                </p>
                            </div>
                            <div className='flex mt-10 justify-center text-center'>
                                <Button onClick={handleDecrement}>-</Button>
                                <span className='min-w-20'>{tokens}</span>
                                <Button onClick={handleIncrement}>+</Button>

                            </div>
                            <p className='mt-10 text-2xl'>
                                Total : ₹ {total.toFixed()}.00
                            </p>
                            {tokens >= 10 && tokens < 20 && (
                                <p className='text-green-700'>10% discount applied</p>
                            )}
                            {tokens >= 20 && (<p className='text-green-700'>15% discount applied </p>)}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button className="w-full">Purchase Tokens</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default Page
