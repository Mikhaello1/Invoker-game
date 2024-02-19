import React, {useEffect} from 'react'
import './RecordWindow.css'

export default function RecordWindow({tries, record, isGameStarted,setIsGameStarted}) {

  useEffect(() => {
    window.addEventListener('keydown', handleEnterPress)
    
    return (
      window.removeEventListener('keydown', handleEnterPress)
    )
  }, [])

  function handleEnterPress(event){
    if (event.key === 'Enter'){
      isGameStarted = true;
      setIsGameStarted(isGameStarted);
      console.log('sosi')
    }
  }

  return (
    <div className='RecordWindow'>
        <div className='yourRecord__text'>Your Record:</div>
        <div className='record'>{record}</div>
        <div className='tries'>Try: {tries}</div>
        <div className='restart__text' onClick={() => setIsGameStarted(true)}>Press ENTER to restart</div>
    </div>
  )
}
