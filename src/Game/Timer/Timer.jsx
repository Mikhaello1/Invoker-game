import React, {useEffect, useState} from 'react'
import './Timer.css'

export default function Timer({isGameStarted, setIsGameStarted, resetHandleKeyPress, isRecordWindowShowed,setIsRecordWindowShowed}) {
    let [seconds, setSeconds] = useState(10)
    let [miliseconds, setMiliseconds] = useState(0)

    useEffect(() => {
        if (isGameStarted){
           console.log(isRecordWindowShowed)
            const intervalId = setInterval(() => {
                if(seconds === 0 && miliseconds === 0){
                    isGameStarted = false
                    setIsGameStarted(isGameStarted)
                    console.log('game finished')
                    seconds = 10;
                    miliseconds = 0;
                    setMiliseconds(miliseconds)
                    setSeconds(seconds)
                    clearInterval(intervalId)
                    isRecordWindowShowed = true
                    setIsRecordWindowShowed(true)
                    resetHandleKeyPress()
                    return
                    
                }
                if (miliseconds < 0){
                    miliseconds = 99;
                    setMiliseconds(miliseconds)
                    seconds--;
                    setSeconds(seconds);
                }
                else{
                    miliseconds--;
                    setMiliseconds(miliseconds)
                }
            }, 10)
        }
        
    }, [isGameStarted])

    return (
      <div className='Timer'>
        {seconds}:{miliseconds}
      </div>
    )
}
