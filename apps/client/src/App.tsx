import { useEffect, useState } from 'react'
import { socket } from './socket'

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [messages, setMessages] = useState<String[]>([])
  const [input, setInput] = useState('')

  function sendMessage() {
    socket.emit('send', input)
    setInput('')
  }

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    function onReceive(message: String) {
      setMessages((old) => [...old, message])
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('receive', onReceive)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('receive', onReceive)
    }
  }, [])

  return (
    <>
      <div className='p-4 flex flex-col justify-center items-center gap-5'>
        <h1 className='text-xl'>Chat, I guess</h1>
        <p>{`You are ${!isConnected ? 'not' : ''} connected`}</p>
        {messages.map((message, i) => (
          <p key={i}>{message}</p>
        ))}
        <input
          className='border-black border-2'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  )
}

export default App
