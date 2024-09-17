import { useEffect, useState } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


export default function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rolls, setRolls] = useState(0)
  const [time, setTime] = useState(0)

  useEffect(()=>{
    const allHeld = dice.every(function(die){
            return die.isHeld
        })
        
    const allSame = dice.every(function(die){
            return dice[0].value === die.value
    })
        
    if(allHeld && allSame){
        setTenzies(true)
        console.log("You won!")
    }
  }, [dice])

  useEffect(() => {
    let interval;
    if (!tenzies) {  // Start timer if the game is not won
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000)
    } else {
      clearInterval(interval) // Stop timer when the game is won
    }

    return () => clearInterval(interval)
  }, [tenzies])
  
  function generateTime(){
    if(time => 60){
      const seconds = time%60
      const minutes = Math.floor(time/60)

      return `Time taken to get Tenzies: ${minutes} minutes and ${seconds} seconds`
    }
    else{
      return `Time taken to get Tenzies: ${time} seconds`
    }
  }

  function allNewDice(){
    const newDice = []

    for (let index = 0; index < 10; index++) {
      newDice.push({
        id: nanoid(),
        isHeld: false,
        value: Math.ceil(Math.random() * 6)
      })      
    }
    return newDice
  }

  function rollDice(){
    if (tenzies) {
      setTenzies(!tenzies)
      setDice(allNewDice())
      setRolls(0)
      setTime(0)
    }
    else{
      setDice(function(prevDice){
        return prevDice.map(function(die){
          return !die.isHeld ? {...die, id: nanoid(), value: Math.ceil(Math.random() * 6)} : die
        })
      })
      setRolls(prevRolls => prevRolls + 1)
    }
  }

  function holdDice(id) {
    setDice(function(prevDice){
        return prevDice.map(function(die) {
            return die.id === id ? { ...die, isHeld: !die.isHeld } : die
        })
    })
}


  const diceElements = dice.map(function(die){
    return <Die key={die.id} id={die.id} isHeld={die.isHeld} value={die.value} holdDice={holdDice}/>
  })
    return (
        <main>
          {tenzies && <Confetti/>}
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          { rolls ? <h2>Rolls: {rolls}</h2> : ""}
          <div className="dice-container">
            {diceElements}
          </div>
          <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
          {tenzies ? <h3>{generateTime()}</h3>: ""}
        </main>
    )
}