import React from 'react'
import '../css/AlarmList.css'


class AlarmList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            content:'',
        }
        this.deleteAlarmItem = this.deleteAlarmItem.bind(this)
    }

    

    deleteAlarmItem(i){
        this.props.deleteAlarmItem(i)
    }



    render(){
        return(
            <div id="alarmList" className={this.props.isCardList}>
                {this.props.alarmList.map((a,i)=>{
                    return <div className="alarmItem" key={i+"alarm"} onClick={()=>this.props.deleteAlarmItem(i)}>
                        <div className="title">{a.title}</div>
                        <div className="content">{a.content}</div>
                    </div>
                })}
            </div>
        )
    }
}

export default AlarmList