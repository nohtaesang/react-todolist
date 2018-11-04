import React from 'react'
import '../css/CardDeck.css'
import Card from './Card'

class CardDeck extends React.Component{
    render(){
        return(
            <div id="cardDeck">
                {this.props.cards.map((a,i)=>{
                    if (this.props.listState==="todo"){
                        if(a.isDone==="isDoneTrue" || a.isDdayPass ==="isDdayPassTrue"){
                            return;
                        }
                    }else if(this.props.listState==="done"){
                        if(a.isDone==="isDoneFalse" && a.isDdayPass ==="isDdayPassFalse" ){
                            return;
                        }
                    }
                        return <Card
                        key={"todoList"+i}
                        cards={a}
                        
                        clickCardOption = {()=>{this.props. clickCardOption(i)}}
                        clickCardDone ={()=>this.props.clickCardDone(i)}
                        clickCardUp ={()=>this.props.clickCardUp(i)}
                        clickCardDown ={()=>this.props.clickCardDown(i)}
                        clickCardEdit ={()=>this.props.clickCardEdit(i)}
                        clickCardDeadline ={()=>this.props.clickCardDeadline(i)}
                        clickCardDelete ={()=>this.props.clickCardDelete(i)}

                        editCard={( title, content)=>this.props.editCard(i,title, content)}
                        setDeadline ={(deadline)=>this.props.setDeadline(i,deadline)}  
                        />
                    


                    
                })}
            </div>
        )
    }
}

export default CardDeck