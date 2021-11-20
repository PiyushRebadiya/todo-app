import React, { useState } from 'react'
import { CloseOutlined } from '@ant-design/icons';

import './App.css';


function App() {
  const [listData, setListData] = useState([
    {
      name: "Piyush",
      id: 45,
      isChecked: false
    },
    {
      name: "Raj",
      id: 33,
      isChecked: false
    }
  ])
  const [buttonBorder, setButtonBorder] = useState({
    all: true,
    completed: false,
    active: false
  })
  const [activeData, setActiveData] = useState([])
  const [completedData, setCompletedData] = useState([])
  const [activeArray, setActiveArray] = useState(false)
  const [completedArray, setCompletedArray] = useState(false)
  const [inputValue, setInputValue] = useState({})

  const changeHandler = (e) => {
    setInputValue({ ...inputValue, name: e.target.value })
  }
  console.log("listData", listData);
  console.log("listData", inputValue);
  
  const handleSubmit = () => {
    console.log("add");
    if (!inputValue.id) {
      setListData([...listData, { name: inputValue.name, id: Math.floor(Math.random() * 100) + 1 ,isChecked: false}])
      setInputValue({ name: "" })
    } else {
      let data = listData.find((item) => item.id === inputValue.id)
      let Index = listData.findIndex((item) => item.id === inputValue.id)
      listData[Index] = { ...data, name: inputValue.name }
      setInputValue({ name: "" })
      console.log(listData);
    }
  }
  
  const handleKeypress = e => {
    if (e.charCode === 13) {
      handleSubmit();
    }
  };
  
  const removeEventListener = (id) => {
    let data = listData.filter((item) => item.id !== id)
    setListData(data)
  }
  
  const editHandler = (data) => {
    console.log("name", data);
    setInputValue(data)
    
  }
  
  const toggleChecked = (id) => {
    // debugger
    console.log("data+++++++++++");
    let data = listData.find((item) => item.id === id)
    let Index = listData.findIndex((item) => item.id === id)
    if(listData[Index].isChecked) {
      listData[Index] = { ...data, isChecked: false }
    } else {
      listData[Index] = { ...data, isChecked: true }
    }
    console.log("dataaaaaaaa",listData);
    setListData(listData)
  }

  const activeListData = () => {
    setButtonBorder({
      all: false,
      completed: false,
      active: true
    });
    const data = listData.filter((item) => item.isChecked !== true)
    console.log("data",data);
    setActiveData(data)
    setCompletedArray(false)
    setActiveArray(true)
  }
  
  const allListData = () => {
    setButtonBorder({
      all: true,
      completed: false,
      active: false
    });
    setActiveArray(false)
    setCompletedArray(false)
  }
  
  const completedListData = () => {
    setButtonBorder({
      all: false,
      completed: true,
      active: false
    });
    const data = listData.filter((item) => item.isChecked === true)
    setCompletedData(data)
    setActiveArray(false)
    setCompletedArray(true)
    console.log("datasdasd",data);
  }
  return (
    <div>
      <div className="container">
        <div className="boxDiv">
          <div className="row">
            <h1 className="titleName">Things To Do</h1>
          </div>
          <div className="row">
            <input
              placeholder="Add new"
              type="text"
              className="inputStyle"
              value={inputValue.name}
              onChange={(e) => changeHandler(e)}
              onKeyPress={(e) => handleKeypress(e)} />
          </div>
          <div className="row ThirdRow">
            <ul className="ulList">
              {
               !completedArray && !activeArray ? listData.map((item, i) => {
                  return (
                    <>
                      <li className={`listData ${item.isChecked ? "completed" : "pending"}`} key={i}>
                       {item.isChecked ? 
                       <input type="checkbox" className="checkBoxStyle" 
                      checked
                       onChange={() => toggleChecked(item.id)}/>
                       : 
                       <input type="checkbox" className="checkBoxStyle" 
                       onChange={() => toggleChecked(item.id)}/>}
                        <span className={`listTextStyle`}  onClick={() => editHandler(item)}>{item.name}</span>
                        <CloseOutlined className="closeIcon" onClick={() => removeEventListener(item.id)} />
                      </li>
                      <hr />
                    </>
                  )
                }) 
                :
                completedArray ? completedData.map((item, i) => {
                  return (
                    <>
                      <li className="listData completed" key={i}>
                        <input type="checkbox" className="checkBoxStyle" checked={item.isChecked} 
                        onChange={() => toggleChecked(item.id)}/>
                        <span className="listTextStyle"  onClick={() => editHandler(item)}>{item.name}</span>
                        <CloseOutlined className="closeIcon" onClick={() => removeEventListener(item.id)} />
                      </li>
                      <hr />
                    </>
                  )
                })
                :
                activeArray &&  activeData.map((item, i) => {
                  return (
                    <>
                      <li className="listData pending" key={i}>
                        <input type="checkbox" className="checkBoxStyle"  
                        onChange={() => toggleChecked(item.id)}/>
                        <span className="listTextStyle"  onClick={() => editHandler(item)}>{item.name}</span>
                        <CloseOutlined className="closeIcon" onClick={() => removeEventListener(item.id)} />
                      </li>
                      <hr />
                    </>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
      <div className="container Footer">
        <ul className="ulFooter">
          <span className="footerLengthItem">Item : {listData.length}</span>
          <li><button className={`FooterButton ${buttonBorder.all ? "activeButtonBorder" : ""}`} onClick={() => allListData()}>All</button></li>
          <li><button className={`FooterButton ${buttonBorder.active ? "activeButtonBorder" : ""}`} onClick={() => activeListData()}>Active</button></li>
          <li><button className={`FooterButton ${buttonBorder.completed ? "activeButtonBorder" : ""}`} onClick={() => completedListData()}>Completed</button></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
