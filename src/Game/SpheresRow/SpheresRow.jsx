import React from 'react'
import './SpheresRow.css'
import SphereCage from './SphereCage/SphereCage.jsx'

export default function SpheresRow({spheresRow}) {
  
  return (
    <div className='SpheresRow'>
        {spheresRow.map((sphere) => <SphereCage sphere={sphere}/>)}
    </div>
  )
}
