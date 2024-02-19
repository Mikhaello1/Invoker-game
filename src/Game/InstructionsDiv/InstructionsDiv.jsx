import React from 'react'
import './InstructionsDiv.css'

export default function InstructionsDiv({instructions, isGameStarted}) {

  
  return (
    <div className='InstructionsDiv'>
        {isGameStarted ? instructions : 'Press ENTER to start'}
    </div>
  )
}
