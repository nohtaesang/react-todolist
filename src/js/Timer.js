import React from 'react'

class Timer extends React.Component{
    componentDidMount(){
        this.interval = setInterval(()=>{
            this.props.setCurrentTime(currentTime())
        },1000)
    }
    render(){
        return(
            <div>
                
            </div>
        )
    }
}

let currentTime = ()=>{
  let date = new Date();
  let today = {
      day: date.getDate() < 10 ? "0"+date.getDate(): date.getDate(),
      month: date.getMonth()+1 < 10 ? "0"+date.getMonth()+1 : date.getMonth()+1,
      year: date.getFullYear(),
      hour: date.getHours() < 10 ? "0"+date.getHours() : date.getHours(),
      minute: date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes(),
  }
  date = today.year+'-'+today.month+'-'+today.day+'T'+today.hour+":"+today.minute;
  return date
}

export default Timer