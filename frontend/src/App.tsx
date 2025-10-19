import {useState} from 'react'
import './App.css'
import {Button} from "@/components/ui/button.tsx"

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <h1>Vite + React</h1>
            <div className="bg-background">
                <Button className={"text-foreground"} onClick={() => setCount((count) => count + 1)}>
                    up
                </Button>
                <Button className={"bg-secondary"} onClick={() => setCount((count) => count - 1)}>
                    down
                </Button>
                <p>
                    {count}
                </p>
            </div>
        </>
    )
}

export default App
