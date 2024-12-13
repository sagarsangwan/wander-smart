import { ThemeProvider } from "./theme-provider"
import { Toaster } from "react-hot-toast"
import NextTopLoader from "nextjs-toploader"
import { SessionProvider } from "next-auth/react"
function Providers({ children }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <NextTopLoader position="top-right" />

            <Toaster />
            <SessionProvider>

                {children}
            </SessionProvider>

        </ThemeProvider>
    )
}

export default Providers
