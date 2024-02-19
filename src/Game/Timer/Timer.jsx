import React, {useEffect, useState} from 'react'
import './Timer.css'

export default function Timer({isGameStarted, setIsGameStarted}) {
    let [seconds, setSeconds] = useState(10)
    let [miliseconds, setMiliseconds] = useState(0)

    useEffect(() => {
        if (isGameStarted){
           
            setInterval(() => {
                if(seconds === 0 && miliseconds === 0){
                    isGameStarted = false
                    setIsGameStarted(isGameStarted)
                    setMiliseconds(0)
                    setSeconds(10)
                    return;
                }
                if (miliseconds < 0){
                    miliseconds = 99;
                    setMiliseconds(miliseconds)
                    seconds--;
                    setSeconds(seconds);
                }
                miliseconds--;
                setMiliseconds(miliseconds)
            }, 10)

            
            if (seconds === 0){
                isGameStarted = false;
                setIsGameStarted(isGameStarted);
            }
        }
        
    }, [isGameStarted])

    return (
      <div className='Timer'>
        {seconds}:{miliseconds}
      </div>
    )
}
