import React, {useState} from "react";
import Dnd from '../exports/dnd';

const Home = () => {
    window['Dnd'] = Dnd;
    const [npc, setNpc] = useState([]);
    
    function createMonster(characterRace, characterClass, characterLevel){
        const newCharacter = Dnd.Core.createStatBlock(characterRace, characterClass, characterLevel)
        setNpc((previousNpc) => [...previousNpc, newCharacter]);
    }

    return(
        <div>
            <div>
                <NPCForm createMonster={createMonster}/>
                {npc.map((character, index) => (
                    <NPCCard index={index} character={character}/>
                ))}
            </div>
        </div>
    )
}

const FormNumber = ({id, text, min, max}) => {
    return (
        <div className={'npcFormInput'}>
            <label>{text}</label>
            <input id={id} defaultValue={1} type={'number'} min={min} max={max}/>
        </div>
    )
}

const Select = ({ id, options }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    }

    return (
        <select id={id} value={selectedOption} onChange={handleSelectChange}>
            {options.map((option, index) => {
                return <option value={option}>{option}</option>
            })}
        </select>
    )
}

const FormSelect = ({ id, text, options }) => {
    return(
        <div className={'npcFormInput'}>
            <label>{text}</label>
            <Select id={id} options={options}/>
        </div>
    )

}

const FormCheckbox = ({ id }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheck = (event) => {
        if(isChecked === true) return setIsChecked(false);
        setIsChecked(true);
    }

    return(
        <div className={'npcFormCheckbox'}>
            <label htmlFor={id}>Randomize</label>
            <input id={id} name={id} type={'checkbox'} checked={isChecked} onChange={handleCheck}/>
        </div>
    )
}

const NPCForm = ({ createMonster }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const characterRace = document.getElementById('raceSelect').value;
        const characterClass = document.getElementById('classSelect').value;
        const characterLevel = document.getElementById('levelSelect').value;

        // const checkRace = document.getElementById('raceCheck');
        // const checkClass = document.getElementById('classCheck');
        // const checkLevel = document.getElementById('levelCheck');
        createMonster(characterRace, characterClass, parseInt(characterLevel));
    }

    return (
        <form className={'npcForm'}>
            <div className={'container'}>
                <FormSelect id={'raceSelect'} text={'Race: '} options={Dnd.races}/>
                <FormCheckbox id={'raceCheck'}/>
            </div>
            
            <div className={'container'}>
                <FormSelect id={'classSelect'} text={'Class: '} options={Dnd.classes}/>
                <FormCheckbox id={'classCheck'}/>
            </div>

            <div className={'container'}>
                <FormNumber id={'levelSelect'}  text={'Level: '} min={1} max={20} type={'number'}/>
                <FormCheckbox id={'levelCheck'}/>
            </div>
            <button onClick={handleSubmit}>Create</button>
        </form>
    )
}

const NPCCard = ({ index, character }) => {
    function proficient(skill) {
        let proficiencyType = '';
        if(character.proficiencies.includes(skill)) proficiencyType = 'proficiency'
        if(character.expertise.includes(skill)) proficiencyType = 'expertise';
        return proficiencyType;
    }
    return (
        <div key={index} className={'npcCard'}>
            <div className="container">
                <div>Class: {character.race}</div>
                <div>Race: {character.class}</div>
                <div>Level: {character.level}</div>
            </div>
            
            <div className={'container'}>
                <div>Proficiency Bonus: {character.proficiencyBonus}</div>
                <div>AC: {character.ac}</div>
                <div>Initiative: {character.initiative}</div>
            </div>

            <div className="container">
                <div className={''}>
                    <ul className={'characterAbilities'}>
                        {/* <li className='ability ability1'>Str: {character.abilities.str}</li> */}
                        <li className='ability ability1'><div>STR</div><div>{character.abilities.str}</div></li>
                        <li className='ability ability2'><div>CON</div><div>{character.abilities.con}</div></li>
                        <li className='ability ability3'><div>DEX</div><div>{character.abilities.dex}</div></li>
                        <li className={'abilityLabel'}>Abilities</li>
                        <li className='ability ability4'><div>INT</div><div>{character.abilities.int}</div></li>
                        <li className='ability ability5'><div>WIS</div><div>{character.abilities.wis}</div></li>
                        <li className='ability ability6'><div>CHA</div><div>{character.abilities.cha}</div></li>
                    </ul>                            
                </div>

                <div>
                    <ul className={'characterSaves'}>
                        <li className={'save save1'}><div>STR</div><div>{character.saves.str}</div></li>
                        <li className={'save save2'}><div>CON</div><div>{character.saves.con}</div></li>
                        <li className={'save save3'}><div>DEX</div><div>{character.saves.dex}</div></li>
                        <li className='saveLabel'>Saves:</li>
                        <li className={'save save4'}><div>INT</div><div>{character.saves.int}</div></li>
                        <li className={'save save5'}><div>WIS</div><div>{character.saves.wis}</div></li>
                        <li className={'save save6'}><div>CHA</div><div>{character.saves.cha}</div></li>
                    </ul>
                </div>
                
                <div>
                        <div className="skillLabel">Skills:</div>
                    <ul className={'container characterSkills'}>
                        <li className={`skill skill1 ${proficient('athletics')}`}><div>Athletics</div><div>{character.skills.athletics}</div></li>
                        <li className={`skill skill2 ${proficient('animalHandling')}`}><div>Animal Handling</div><div>{character.skills.animalHandling}</div></li>
                        <li className={`skill skill3 ${proficient('arcana')}`}><div>Arcana</div><div>{character.skills.arcana}</div></li>
                        <li className={`skill skill4 ${proficient('acrobatics')}`}><div>Acrobatics</div><div>{character.skills.acrobatics}</div></li>
                        <li className={`skill skill5 ${proficient('deception')}`}><div>Deception</div><div>{character.skills.deception}</div></li>
                        <li className={`skill skill6 ${proficient('history')}`}><div>History</div><div>{character.skills.history}</div></li>
                        <li className={`skill skill7 ${proficient('insight')}`}><div>Insight</div><div>{character.skills.insight}</div></li>
                        <li className={`skill skill8 ${proficient('intimidation')}`}><div>Intimidation</div><div>{character.skills.intimidation}</div></li>
                        <li className={`skill skill9 ${proficient('investigation')}`}><div>Investigation</div><div>{character.skills.investigation}</div></li>
                        <li className={`skill skill10 ${proficient('medicine')}`}><div>Medicine</div><div>{character.skills.medicine}</div></li>
                        <li className={`skill skill11 ${proficient('nature')}`}><div>Nature</div><div>{character.skills.nature}</div></li>
                        <li className={`skill skill12 ${proficient('perception')}`}><div>Perception</div><div>{character.skills.perception}</div></li>
                        <li className={`skill skill13 ${proficient('performance')}`}><div>Performance</div><div>{character.skills.performance}</div></li>
                        <li className={`skill skill14 ${proficient('persuasion')}`}><div>Persuasion</div><div>{character.skills.persuasion}</div></li>
                        <li className={`skill skill15 ${proficient('religion')}`}><div>Religion</div><div>{character.skills.religion}</div></li>
                        <li className={`skill skill16 ${proficient('sleightOfHand')}`}><div>Sleight Of Hand</div><div>{character.skills.sleightOfHand}</div></li>
                        <li className={`skill skill17 ${proficient('stealth')}`}><div>Stealth</div><div>{character.skills.stealth}</div></li>
                        <li className={`skill skill18 ${proficient('survival')}`}><div>Survival</div><div>{character.skills.survival}</div></li>
                    </ul>
                </div>
            </div>


            <div>
                <div>Passives:</div>
                <ul className={'container characterPassives'}>
                    <li id='passive1'>Perception: {character.passives.perception}</li>
                    <li id='passive2'>Investigation: {character.passives.investigation}</li>
                    <li id='passive3'>Insight: {character.passives.insight}</li>
                </ul>
            </div>
        </div>
    )
}


export default Home;