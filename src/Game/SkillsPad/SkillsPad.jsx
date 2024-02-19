import React from 'react'
import './SkillsPad.css'
import Skill from './Skill/Skill'

export default function SkillsPad({castedSkills}) {
  return (
    <div className='SkillsPad'>
        <Skill skillKey='Q'/>
        <Skill skillKey='W'/>
        <Skill skillKey='E'/>
        <Skill skillKey='D' castedSkill={castedSkills[0]}/>
        <Skill skillKey='F' castedSkill={castedSkills[1]}/>
        <Skill skillKey='R'/>
    </div>
  )
}
