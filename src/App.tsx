import './App.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { api } from './lib/api'
import {
    useQuery,
} from '@tanstack/react-query'

async function getTotalSpent() {
    const res = await api.expenses['total-spent'].$get()
    if (!res.ok) {
        throw new Error("Failed to fetch total spent")
    }
    const data = res.json()
    return data
}

function App() {
    const { data, isPending, error } = useQuery({ queryKey: ['get-total-spent'], queryFn: getTotalSpent })

    if (error) {
        return <div>Error: {(error as Error).message}</div>
    }

    return (
        <Card className='w-[350px] m-auto mt-10 p-5'>
            <CardHeader>
                <CardTitle>Total Spent</CardTitle>
                <CardDescription>the total amount you have spent</CardDescription>
            </CardHeader>
            <CardContent>{isPending ? "loadig ... " : data?.totalSpent}</CardContent>
        </Card>
    )
}

export default App
