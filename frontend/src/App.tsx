import {useState} from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <h1>Vite + React</h1>
            <div className="card">
                <button className={"bg-red-100 p-2"} onClick={() => setCount((count) => count + 1)}>
                    up
                </button>
                <button className={"bg-blue-100 p-2"} onClick={() => setCount((count) => count - 1)}>
                    down
                </button>
                <p>
                    {count}
                </p>
            </div>
        </>
    )
}

export default App
