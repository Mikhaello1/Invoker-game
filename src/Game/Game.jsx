import './Game.css';
import React, { useState, useEffect } from 'react'
import InstructionsDiv from './InstructionsDiv/InstructionsDiv.jsx';
import SkillsPad from './SkillsPad/SkillsPad.jsx';
import SpheresRow from './SpheresRow/SpheresRow.jsx';
import skillsList from './skillsList.js';
import Timer from './Timer/Timer.jsx';
import RecordWindow from './RecordWindow/RecordWindow.jsx';


export default function Game() {
    let [isGameStarted, setIsGameStarted] = useState(false);
    let [instructions, setInstructions] = useState({});
    let [spheresRow, setSpheresRow] = useState(['', '', '']);
    let [castedSkills, setCastedSkills] = useState(['', '']);
    let [record, setRecord] = useState(0);
    let [tries, setTries] = useState(0);

    useEffect(() => {
        function handleKeyPress(event) {
            if (event.key === 'Enter' && !isGameStarted){
                isGameStarted = true;
                setIsGameStarted(isGameStarted);
                instructions = getRandomSkill(skillsList);
                setInstructions(instructions);
                tries++;
                setTries(tries)
                
                           
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
                let nsr = [...spheresRow];
                if (combinationCheck(nsr, instructions.combination.split(""))){
                    addToCastedSkills(instructions.skillName);
                    let newInstructions = getRandomSkill(skillsList);
                    if (newInstructions === instructions){
                        skillsList.splice(newInstructions.id, 1)
                        instructions = getRandomSkill(skillsList);
                        setInstructions(instructions);
                        return;
                    }
                    if (newInstructions !== instructions){
                        instructions = newInstructions;
                        setInstructions(instructions);
                        if (skillsList.length !== 10){
                            skillsList.splice(newInstructions.id, 0, newInstructions);
                        }
                    }
                    record++;
                    setRecord(record);
                }
            }
        }
  
        window.addEventListener('keypress', handleKeyPress);
  
        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, []);

    function addToCastedSkills(skill){
        for(let i = 0; i<castedSkills; i++){
            if (castedSkills[i] === ''){
                castedSkills[i] = skill;
                setCastedSkills(castedSkills);
                return;
            }
        }
        castedSkills[1] = castedSkills[0];
        castedSkills[0] = skill;
        setCastedSkills(castedSkills)
    }

    function combinationCheck(spheres, comb){
        let i = 0;
        let j = 0;
        let checker = 0;
        while(comb.length>0 || checker!==3){
            if (spheres[i] === comb[j]){
                comb.splice(j, 1);
                spheres.splice(i, 1);
                checker++;
                i = 0;
                j = 0;
            }
            if (spheres[i] !== comb[j]){
                i++;
            }
            if (i === spheres.length && checker!==3){
                return false;
            }
            if ((comb.length === 1 && spheres.length === 1) && comb[0] !== spheres[0]){
                return false;
            }
            if(checker === 3){
                return true;
            }
        }
    }
  
    function addToSpheresRow(sphere){
        let newSpheresRow = [...spheresRow];
        console.log(newSpheresRow)
        for(let i = 0; i<spheresRow.length; i++){
          if (newSpheresRow[i] === ''){
              newSpheresRow[i] = sphere;
              setSpheresRow(newSpheresRow)
              spheresRow = [...newSpheresRow]
              console.log(newSpheresRow)
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



  return (
    <div className='Game'>
        <h1 className='gameName'>Invo Game</h1>
        <Timer 
            isGameStarted={isGameStarted} 
            setIsGameStarted={setIsGameStarted}/>
        <InstructionsDiv 
            instructions={instructions.skillName}
            isGameStarted={isGameStarted}/>
        <SpheresRow spheresRow={spheresRow}/>
        <SkillsPad castedSkills={castedSkills}/>
        {
            (tries > 0 && !isGameStarted) && 
                <RecordWindow 
                    tries={tries}
                    record={record}
                    isGameStarted={isGameStarted}
                    setIsGameStarted={setIsGameStarted}
                />
        }
        <button onClick={showPenis}> show</button>
        

    </div>
  )
}
