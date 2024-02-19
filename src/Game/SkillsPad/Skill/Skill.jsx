import React from 'react'
import './Skill.css'

export default function Skill(props) {
  return (
    <div className='Skill'>
        {props.castedSkill ? props.castedSkill : props.skillKey}
        
    </div>
  )
}
