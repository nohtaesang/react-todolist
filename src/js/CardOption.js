import React from 'react'
import '../css/CardOption.css'

import DeadlineSetting from './DeadlineSetting'
import {Icon } from 'react-icons-kit'
import {ellipsisH} from 'react-icons-kit/fa/ellipsisH'
import {check} from 'react-icons-kit/fa/check'
import {clockO} from 'react-icons-kit/fa/clockO'
import {pencil} from 'react-icons-kit/fa/pencil'
import {arrowUp} from 'react-icons-kit/fa/arrowUp'
import {arrowDown} from 'react-icons-kit/fa/arrowDown'
import {trashO} from 'react-icons-kit/fa/trashO'

const CardOption = (props) =>{
    return(
        <div className="cardOption">
            <div className="cog" onClick={props.clickCardOption}> 
                    <Icon size={24} icon={ellipsisH}></Icon>
                    
            </div>
            <div className={"option "+ props.cards.isOption}>
                <Icon size={24} icon={check} onClick={props.clickCardDone}></Icon>
                <Icon size={24} icon={arrowUp} onClick={props.clickCardUp}></Icon>
                <Icon size={24} icon={arrowDown} onClick={props.clickCardDown}></Icon>
                <Icon size={24} icon={pencil}  onClick={props.clickCardEdit}></Icon>
                <Icon size={24} icon={clockO} onClick={props.clickCardDeadline}></Icon>
                <Icon size={24} icon={trashO} onClick={props.clickCardDelete}></Icon>  
                <DeadlineSetting
                    cards={props.cards}
                    setDeadline={(deadline)=>{props.setDeadline(deadline)}}
                    currentTime ={props.currentTime}
                />  
            </div>
        </div>
    )
}


export default CardOption