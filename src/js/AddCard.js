import React from 'react'
import '../css/AddCard.css'
import Textarea from 'react-textarea-autosize'



class AddCard extends React.Component{

    constructor(props){
        super(props)
        this.state={
            title:'',
            content:'',
        }
        this.typing = this.typing.bind(this)
        this.addCard = this.addCard.bind(this)
    }

    typing(e){
        if(e.target.name === "title"){
            this.setState({
                title: e.target.value
            })
        }else if(e.target.name==="content"){
            this.setState({
                content: e.target.value
            })
        }
        
    }

    addCard(){
        this.props.addCard(this.state.title, this.state.content)
        this.setState({
            title:'',
            content:'',
        })
    }

    render(){
        
        return(
            <div id="addCard">
                <div className="inputTitle">
                    <p>Title</p>
                    <Textarea
                            value={this.state.title}
                            name="title"
                            onChange={this.typing}
                            
                    />
                </div>
                <div className="inputContent">
                    <p>Content</p>
                    <Textarea
                        value={this.state.content}
                        name="content"
                        onChange={this.typing}
                    />
                </div>
                <div className="addButton" onClick={this.addCard}>
                    <p>Add</p>
                </div>

              
            </div>
        )
    }
}

export default AddCard