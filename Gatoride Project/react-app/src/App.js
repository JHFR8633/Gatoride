import React, {useState, useEffect} from 'react'

function App() {

    const [data, setData] = useState([{}])

    useEffect(() => {
        fetch("/members")
            .then(res => res.json())
            .then(data => {
                setData(data)
                console.log(data)})
    }, [])

    return (
        <div>
           {(typeof data.members === 'undefined') ? (
                <p>Welcome to Gatoride! This project is made by the Gatoride Team!</p>
           ) : (
                data.members.map((member, i) => (
                    <p key={i}>{member}</p>
                ))
           )}
        </div>
    )
}

export default App