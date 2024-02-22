import React, {useEffect} from 'react'
import './RecordWindow.css'

export default function RecordWindow({tries, record}) {

  return (
    <div className='RecordWindow'>
        <div className='yourRecord__text'>Your Record:</div>
        <div className='record'>{record}</div>
        <div className='tries'>Try: {tries}</div>
        <div className='restart__text'>Press ENTER to restart</div>
    </div>
  )
}
