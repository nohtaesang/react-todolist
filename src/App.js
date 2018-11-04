import React, { Component } from 'react';
import './App.css'
import AddCard from './js/AddCard'
import CardDeck from './js/CardDeck'
import Timer from './js/Timer'
import AlarmList from './js/AlarmList'






class App extends Component {
  constructor(props){
    super(props)

    //1. 현재 시간, 2. 카드들의 정보, 3. 카드 목록 보기, 4. list 의 상태
   
    this.state={
      currentTime: '',
      cards:[],
      isCardList: "isCardListFalse",
      listState:"all",
      alarmList:[],
    }
    this.setListState = this.setListState.bind(this)
  }

  //1.현재 시간----------------------------------------------
  //현재 시간 설정
  setCurrentTime(time){
    let cards = this.state.cards
    for(let i = 0 ; i < cards.length; i ++){
      if(cards[i].isDeadline==="isDeadlineTrue"){
        this.calDeadline(i)
      }
    }
    this.setState({
      currentTime:time,
    })
  }
  //1 --------------------------------------------------------
  

  




  //2. 카드 관련---------------------------------------------
  
  //2.1 카드를 추가한다.------------------------------------------
  //cards: title, content, deadline, dday
  //isOption(옵션 활성화 여부), isEdit(수정 활성화 여부), isDeadlineSetting(데드라인 설정 활성화 여부), 
  //isDone(완료 여부), isDealine(데드라인 활성화 여부), isDdayPass (시간이 지났는지의 여부)
  addCard(title, content){
    let cards = this.state.cards;
    cards.push({
      title:title,
      content:content,
      deadline:'',
      dday:"D-Day",
      isOption: "isOptionFalse",
      isDone:"isDoneFalse",
      isEdit:"isEditFalse",
      isDeadlineSetting:"isDeadlineSettingFalse",
      isDeadline: "isDeadlineFalse",
      isDdayPass: "isDdayPassFalse",
      isAlarm: false,
    })

    this.setState({
      cards: cards,
    })
  }
  //2.1 ------------------------------------------------------
  
  //2.2 옵션의 버튼들 (Done, up, down, edit, deadline, delete)---------------
  //옵션 클릭
  clickCardOption(i){
    let cards = this.state.cards;
    cards[i].isOption = cards[i].isOption === "isOptionTrue" ? "isOptionFalse" : "isOptionTrue";
    for(let j = 0 ; j < cards.length ; j ++){
      if(j!==i){
        cards[j].isOption="isOptionFalse";
      }
    }
    this.setState({
      cards: cards,
    })
  }

  //완료 클릭
  clickCardDone(i){
    let cards = this.state.cards;
    cards[i].isDone = cards[i].isDone === "isDoneTrue" ? "isDoneFalse" : "isDoneTrue";
    this.setState({
      cards: cards,
    })
  }

  //순서 올리기 클릭
  clickCardUp(i){
    let listState = this.state.listState
    let cards=this.state.cards
    if(i===0) return
    let isExist=false
    let cur = cards[i]
    let target;
    if(listState==="all"){
      isExist=true;
      target = i-1
     
    }else if(listState==="todo"){
      for(let j = i-1 ; j >=0 ; j --){
        if(cards[j].isDone==="isDoneFalse" || cards[j].isDdayPass ==="isDdayPassFalse"){
          target= j
          isExist=true;
          break;
        }
      }
    }else if(listState==="done"){
      for(let j = i-1 ; j >=0 ; j --){
        if(cards[j].isDone==="isDoneTrue" || cards[j].isDdayPass ==="isDdayPassTrue"){
          target= j
          isExist=true;
          break;
        }
      }

    }
    if(isExist){
      cards.splice(target,0,cur)
      cards.splice(i+1,1)
      this.setState({
        cards:cards,
      }) 
    }else{
      return
    }
    
  }

  //순서 내리기 클릭
  clickCardDown(i){
    let listState = this.state.listState
    let cards=this.state.cards
    if(i===cards.length-1) return


    let isExist=false
    let cur = cards[i]
    let target;
    if(listState==="all"){
      isExist=true;
      target = i+1
     
    }else if(listState==="todo"){
      for(let j = i+1 ; j <cards.length ; j ++){
        if(cards[j].isDone==="isDoneFalse" || cards[j].isDdayPass ==="isDdayPassFalse"){
          target= j
          isExist=true;
          break;
        }
      }
    }else if(listState==="done"){
      for(let j = i+1 ; j <cards.length ; j ++){
        if(cards[j].isDone==="isDoneTrue" || cards[j].isDdayPass ==="isDdayPassTrue"){
          target= j
          isExist=true;
          break;
        }
      }
    }

    if(isExist){
      cards.splice(target+1,0,cur)
      cards.splice(i,1)
      this.setState({
        cards:cards,
      }) 
    }else{
      return
    }
  }

  //수정 클릭
  clickCardEdit(i){
    let cards=this.state.cards
    cards[i].isEdit = cards[i].isEdit ==="isEditTrue" ?  "isEditFalse" : "isEditTrue"
    this.setState({
      cards : cards,
    })
  }

  //목표 기한 설정 클릭
  clickCardDeadline(i){
    let cards=this.state.cards
    cards[i].isDeadlineSetting = cards[i].isDeadlineSetting === "isDeadlineSettingTrue" ? "isDeadlineSettingFalse" : "isDeadlineSettingTrue"

    if(cards[i].isDeadlineSetting==="isDeadlineSettingTrue" && cards[i].deadline===''){
      cards[i].deadline = this.state.currentTime
      cards[i].isDeadline ="isDeadlineTrue"
    }
    
    this.setState({
      cards:cards,
    })
  }

  //카드 삭제 클릭
  clickCardDelete(i){
    let cards= this.state.cards
    cards.splice(i,1);
    this.setState({
      cards:cards,
    })
  
  }

  //2.2------------------------------------------------------------


  //2.3 이하 옵션의 기능 구현 ----------------------------------------
  //카드 제목, 내용 수정 (title, content)
  editCard(i,title,content){

  
    let cards=this.state.cards

    cards[i].title=title
    cards[i].content=content

    this.setState({
      cards:cards,
    })
 
  }

  //카드 데드라인 수정(deadline)
  setDeadline(i, deadline){
    let cards=this.state.cards
    let alarmList = this.state.alarmList;
    cards[i].deadline = deadline
    cards[i].isDeadline = "isDeadlineTrue"
    this.calDeadline(i)
    this.setState({
      cards:cards,
      alarmList:alarmList,
    }) 
    console.log(alarmList)
  }
  //설정된 데드라인과 현재 시간의 차이 계산 (setDeadline에서만 사용)
  calDeadline(i){
    let cards=this.state.cards
    let deadline = cards[i].deadline
    let alarmList = this.state.alarmList
    if(deadline.length !==16){
      this.resetDeadline(i)
      return
    }



    let currentTime = this.state.currentTime
    let start = new Date(
      currentTime.substring(0,4),
      currentTime.substring(5,7)-1,
      currentTime.substring(8,10),
    )
    let end = new Date(
      deadline.substring(0,4),
      deadline.substring(5,7)-1,
      deadline.substring(8,10),
    )

    let dateGap = Math.ceil(end.getTime() - start.getTime())/(1000 * 3600 * 24);
    if(dateGap >0){
      cards[i].dday=dateGap
      cards[i].dday+=" 일 남았습니다."
      cards[i].isDdayPass ="isDdayPassFalse"
      if(cards[i].isAlarm){
        cards[i].isAlarm=false

      }
    }else if(dateGap <0){
      cards[i].dday=dateGap
      cards[i].dday +=" 일 지났습니다."
      cards[i].isDdayPass ="isDdayPassTrue"
      if(!cards[i].isAlarm){
        cards[i].isAlarm=true
        alarmList.push({
          title: cards[i].title,
          content: cards[i].content, 
        })
        
      }

    }else{
      start = new Date(
        currentTime.substring(0,4),
        currentTime.substring(5,7)-1,
        currentTime.substring(8,10),
        currentTime.substring(11,13),
        currentTime.substring(14,16)
      )
      end = new Date(
        deadline.substring(0,4),
        deadline.substring(5,7)-1,
        deadline.substring(8,10),
        deadline.substring(11,13),
        deadline.substring(14,16)
      )
      dateGap = end.getTime() - start.getTime()
     
      cards[i].dday =parseInt(dateGap/1000/3600)
      cards[i].dday += " 시간 "
      cards[i].dday +=((dateGap/1000/60)%60)
      cards[i].dday += " 분 "
      if(dateGap >0){
        cards[i].dday +=" 남았습니다."
        cards[i].isDdayPass ="isDdayPassFalse"
        if(cards[i].isAlarm){
          cards[i].isAlarm=false
          
        }
      }else if(dateGap<0){
        cards[i].dday +=" 지났습니다."
        cards[i].isDdayPass ="isDdayPassTrue"
        if(!cards[i].isAlarm){
          cards[i].isAlarm=true
          alarmList.push({
            title: cards[i].title,
            content: cards[i].content, 
          })
        }
      }else{
        cards[i].dday ="D-Day"
        cards[i].isDdayPass ="isDdayPassTrue"
        if(!cards[i].isAlarm){
          cards[i].isAlarm=true
          alarmList.push({
            title: cards[i].title,
            content: cards[i].content, 
          })
        }
      }

    }
  }
  //데드라인 설정 초기화
  resetDeadline(i){
    let cards = this.state.cards
    cards[i].deadline = this.state.currentTime
    cards[i].isDeadline = 'isDeadlineFalse'
    cards[i].dday=''
    cards[i].isDdayPass ="isDdayPassFlase"
    cards[i].isAlarm=true
    this.setState({
      cards:cards,
      
    })
  }
  //2.3-------------------------------------------------------

  

  //3. 카드 목록 보기 -------------------------------------
  dispCardList(){
    let isCardList = this.state.isCardList === "isCardListTrue" ? "isCardListFalse" : "isCardListTrue"
    this.setState({
      isCardList:isCardList,
    })
  }
  //-------------------------------------------

  //4. 리스트의 상태 설정하기
  setListState(e){
    let state= e.target.id
    this.setState({
      listState:state,
    })
  }

  deleteAlarmItem(i){
    let alarmList = this.state.alarmList
    alarmList.splice(i,1)
    
    this.setState({
      alarmList:alarmList,
    })
  }


  render() {
    let todo="todo", all="all",done="done";
   if(this.state.listState==="todo"){
    todo+=" active"
   }else if(this.state.listState==="all"){
    all+= " active"
   }else{
    done += " active"
   }
    return (
      <div id="background">
        <div id="topBanner">
          My ToDoList 
        </div>
        <div id="section">
            <div id="category">
              <div className="categoryAdd">
                <div className="title">
                  <p> Add </p>
                </div>
                <AddCard
                  addCard={(title, content)=>this.addCard(title, content)}  
                /> 
              </div>
              <div className="categoryTodo">
              <div className="title">
                <div className={"listState "+all} onClick={this.setListState} id="all">All</div>
                <div className={"listState "+todo} onClick={this.setListState} id="todo">To do</div>
                <div className={"listState "+done} onClick={this.setListState} id="done">Done</div>
                 
                </div>
              <CardDeck 
                cards={this.state.cards}
                
                clickCardOption = {(i)=>{this.clickCardOption(i)}}
                clickCardDone ={(i)=>this.clickCardDone(i)}
                clickCardUp ={(i)=>this.clickCardUp(i)}
                clickCardDown ={(i)=>this.clickCardDown(i)}
                clickCardEdit ={(i)=>this.clickCardEdit(i)}
                clickCardDeadline ={(i)=>this.clickCardDeadline(i)}
                clickCardDelete ={(i)=>this.clickCardDelete(i)}

                editCard={(i, title, content)=>this.editCard(i,title, content)}
                setDeadline ={(i,deadline)=>this.setDeadline(i,deadline)} 
                listState={this.state.listState}
              />
              </div>
              
              {/* <div className="categoryDone">
              <div className="title">
                  <p> Done </p>
                </div>
              </div> */}
            </div>
            
            
        </div>
        <AlarmList 
          alarmList={this.state.alarmList}
          deleteAlarmItem = {(i) => this.deleteAlarmItem(i)}
        />
              
        <Timer
          currentTime = {this.state.currentTime}
          setCurrentTime = {(time)=>this.setCurrentTime(time)}
        />
      </div>
    );
  }
}

export default App;
