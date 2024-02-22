import './Game.css';
import React, { useState, useEffect } from 'react'
import InstructionsDiv from './InstructionsDiv/InstructionsDiv.jsx';
import SkillsPad from './SkillsPad/SkillsPad.jsx';
import SpheresRow from './SpheresRow/SpheresRow.jsx';
import skillsList from './skillsList.js';
import Timer from './Timer/Timer.jsx';
import RecordWindow from './RecordWindow/RecordWindow.jsx';

//сделать рестарт и появление окна рекорда через display: none/flex или опасити хз

export default function Game() {
    let [isGameStarted, setIsGameStarted] = useState(false);
    let [instructions, setInstructions] = useState('');
    let [spheresRow, setSpheresRow] = useState(['', '', '']);
    let [castedSkills, setCastedSkills] = useState(['', '']);
    let [record, setRecord] = useState(0);
    let [tries, setTries] = useState(0);
    let [isRecordWindowShowed, setIsRecordWindowShowed] = useState(false);     
    let [bestRecord, setBestRecord] = useState(0);  
    
    function restartGame(){
        castedSkills = ['', ''];
        setCastedSkills(castedSkills);
        record = 0;
        setRecord(record)
        isGameStarted = true;
        setIsGameStarted(isGameStarted);
        instructions = getRandomSkill(skillsList).skillName;
        setInstructions(instructions);
        tries++;
        setTries(tries)
        isRecordWindowShowed = false
        setIsRecordWindowShowed(false)
        console.log('gamestarted')
    }    

    function hideRecordWindow(){
        isRecordWindowShowed = false; 
        setIsRecordWindowShowed(false)
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter' && !isGameStarted){
            if (isRecordWindowShowed){
                hideRecordWindow()
            }
            else{ 
                restartGame()
            }
        }
        if((event.key === 'q' || event.key === 'Q') && isGameStarted){
            addToSpheresRow('Q')
        }
        if((event.key === 'W' || event.key === 'w') && isGameStarted){
            addToSpheresRow('W')
        }
        if((event.key === 'E' || event.key === 'e') && isGameStarted){
            addToSpheresRow('E')

        }
        if((event.key === 'D' || event.key === 'd') && isGameStarted){

        }
        if((event.key === 'F' || event.key === 'f') && isGameStarted){

        }
        if((event.key === 'R' || event.key === 'r') && isGameStarted){
            addToCastedSkills(invoke(spheresRow))
            if(castedSkills[0] === instructions){                
                instructions = getRandomSkill(skillsList).skillName;
                setInstructions(instructions);
                record++;
                setRecord(record);
                
            }
        }
    }

    function invoke(spheresRow){
        for (let q = 0; q<skillsList.length; q++){
            let skill = skillsList[q];
            let checker = 0;
            let spheres = [...spheresRow];
            let comb = skill.combination.split('');
            let i = 0;
            let j = 0;
            while(comb.length>0 || checker!==3){
                if (spheres[i] === comb[j]){
                    comb.splice(j, 1);
                    spheres.splice(i, 1);
                    checker++;
                    i = 0;
                    j = 0;

                }

                if (spheres[i] !== comb[j]) i++;

                if(checker === 3) return skill.skillName;

                if (i === spheres.length && checker!==3) break;

                if ((skill.combination.length === 1 && spheres.length === 1) && skill.combination[0] !== spheres[0]) break;

                if (i === spheres.length && (spheres[i] !== comb[j])) break;
            }
        }

    }

    useEffect(() => {

        window.addEventListener('keypress', handleKeyPress);
  
        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, []);

    function addToCastedSkills(skill){
        if (castedSkills[0] === skill) return
        castedSkills[1] = castedSkills[0];
        castedSkills[0] = skill;
        setCastedSkills(castedSkills)
    }
  
    function addToSpheresRow(sphere){
        let newSpheresRow = [...spheresRow];
        for(let i = 0; i<spheresRow.length; i++){
          if (newSpheresRow[i] === ''){
              newSpheresRow[i] = sphere;
              setSpheresRow(newSpheresRow)
              spheresRow = [...newSpheresRow]
              return;
          }
        }
        newSpheresRow[0] = newSpheresRow[1];
        newSpheresRow[1] = newSpheresRow[2];
        newSpheresRow[2] = sphere;
        spheresRow = [...newSpheresRow]
        setSpheresRow(newSpheresRow)
    }

    
    function getRandomSkill(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }

    function showPenis(){
        console.log(tries, isGameStarted, record, isGameStarted)
    }

    function resetHandleKeyPress(){
        window.removeEventListener('keypress', handleKeyPress)
        isGameStarted = false;
        setIsGameStarted(false)
        window.addEventListener('keypress', handleKeyPress)
    }



  return (
    <div className='Game'>
        <h1 className='gameName'>Invo Game</h1>
        <Timer 
            isGameStarted={isGameStarted} 
            setIsGameStarted={setIsGameStarted}
            resetHandleKeyPress={resetHandleKeyPress}
            isRecordWindowShowed={isRecordWindowShowed}
            setIsRecordWindowShowed={setIsRecordWindowShowed}
        />
        <InstructionsDiv 
            instructions={instructions}
            isGameStarted={isGameStarted}
        />
        <SpheresRow spheresRow={spheresRow}/>
        <SkillsPad castedSkills={castedSkills}/>
        {
            isRecordWindowShowed && <RecordWindow tries={tries} record={record}/>
        }

        <button onClick={showPenis}> show</button>
        

    </div>
  )
}
