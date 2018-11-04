import React from 'react'
import '../css/DeadlineSetting.css'

class DeadlineSetting extends React.Component{

    constructor(props){
        super(props)
        this.typing = this.typing.bind(this)
    }

    typing(e){
        if(e.target.name === "deadline"){
            let deadline= e.target.value
            this.props.setDeadline(deadline);
        }
    }

    render(){
        return(
            <div className={"deadlineSetting " + this.props.cards.isDeadlineSetting} >
               <input 
                value={this.props.cards.deadline}
                type="datetime-local"
                name="deadline"
                onChange={this.typing}
                />
            </div>
        )
    }

    
}


export default DeadlineSetting