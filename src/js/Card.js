import React from 'react'
import '../css/Card.css'
import CardOption from '../js/CardOption'
import Textarea from 'react-textarea-autosize'


class Card  extends React.Component{
    constructor(props){
        super(props)
        this.typing = this.typing.bind(this)
    }


    typing(e){
        if(this.props.cards.isEdit ==="isEditFalse") return
        let titleText = this.props.cards.title
        let contentText =this.props.cards.content

        if(e.target.name === "title"){
            titleText=e.target.value
        }else if(e.target.name==="content"){
            contentText= e.target.value
        }
     
        this.props.editCard(titleText,contentText)
    }


    render(){
        return(
            <div className={"card " + this.props.cards.isEdit +" " + this.props.cards.isDone +" "+this.props.cards.isDdayPass}>
                <div className="title">
                    <Textarea
                        value={this.props.cards.title}
                        name="title"
                        onChange={this.typing}
                    />
                    <CardOption
                        cards = {this.props.cards}

                        clickCardOption = {()=>{this.props.clickCardOption()}}
                        clickCardDone ={()=>this.props.clickCardDone()}
                        clickCardUp ={()=>this.props.clickCardUp()}
                        clickCardDown ={()=>this.props.clickCardDown()}
                        clickCardEdit ={()=>this.props.clickCardEdit()}
                        clickCardDeadline ={()=>this.props.clickCardDeadline()}
                        clickCardDelete ={()=>this.props.clickCardDelete()}

                        setDeadline ={(deadline)=>this.props.setDeadline(deadline)}  
                    />
                </div>
                <div className="content">
                    <Textarea
                        value={this.props.cards.content}
                        name="content"
                        onChange={this.typing}
                    />
                </div>
                <div className={"deadline " + this.props.cards.isDeadline}>
                   
                        {this.props.cards.dday}
                  
                        
                
                </div>
            </div>
        )
    }
   
}


export default Card