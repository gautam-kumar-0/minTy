import { useState } from 'react'
import Keyboard from "./components/Keyboard"
import './App.css'
import TextWindow from './components/TextWindow'

function App() {
  const [count, setCount] = useState(0)
  const text = "Lorem ipsum consectetur adipisicing dolorum ad ratione nulla obcaecati explicabo eligendi. Possimus adipisci assumenda fugit harum iure qui neque obcaecati"
  return (
    <>
    <TextWindow text={text}></TextWindow>
      <Keyboard></Keyboard>
    </>
  )
}

export default App
