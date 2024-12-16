import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

function PlanExpired() {
    return (
        <div className='h-screen flex'>
            <div className=' m-auto'>
                <Card className="justify-center text-center">
                    <CardHeader>
                        <CardTitle>OOps, You are out of Token</CardTitle>
                    </CardHeader>
                    <CardFooter className="text-center justify-center ">
                        <Button size="lg" className="animate-bounce">
                            <Link href="/pricing">Buy Some Token</Link>
                        </Button>
                    </CardFooter>
                </Card>


            </div>
        </div>
    )
}

export default PlanExpired
