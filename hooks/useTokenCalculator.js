import  { useEffect, useState } from 'react'

function useTokenCalculator() {
    const [tokens, setTokens] = useState(1)
    const [total, setTotal] = useState(0)

    const calculateTotal = (tokenCount) => {
        let price = tokenCount * 20
        if (tokenCount >= 10)
            price = price * 0.9
        if (tokenCount >= 20) {
            price *= 0.85
        }
        return price
    }
    useEffect(() => {
        setTotal(calculateTotal(tokens))
    }, [tokens])
    const handleDecrement = () => { setTokens((prevTokens) => Math.max(1, prevTokens - 1)) }
    const handleIncrement = () => { setTokens((prevTokens) => prevTokens + 1) }
    return {
        handleDecrement,
        handleIncrement,
        tokens, setTokens, total, setTotal
    }

}

export default useTokenCalculator
