import React, { useState } from 'react'
import { CloseOutlined } from '@ant-design/icons';
import $ from 'jquery'

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
    console.log("data+++++++++++");
    let data = listData.find((item) => item.id === id)
    let Index = listData.findIndex((item) => item.id === id)
    if(listData[Index].isChecked) {
      listData[Index] = { ...data, isChecked: false }
      console.log("1111111111111");
      document.getElementsByClassName("listData")[Index].classList.remove("completed")
      document.getElementsByClassName("listData")[Index].classList.add("pending")
    } else {
      console.log("222222222222");
      document.getElementsByClassName("listData")[Index].classList.remove("pending")
      document.getElementsByClassName("listData")[Index].classList.add("completed")
      listData[Index] = { ...data, isChecked: true }
    }
    console.log("dataaaaaaaa",listData);
  }

  const activeListData = () => {
    document.getElementsByClassName("FooterButton")[0].classList.remove("activeButtonBorder")
    document.getElementsByClassName("FooterButton")[2].classList.remove("activeButtonBorder")
    document.getElementsByClassName("FooterButton")[1].classList.add("activeButtonBorder")
    const data = listData.filter((item) => item.isChecked !== true)
    console.log("data",data);
    setActiveData(data)
    setCompletedArray(false)
    setActiveArray(true)
  }
  
  const allListData = () => {
    document.getElementsByClassName("FooterButton")[1].classList.remove("activeButtonBorder")
    document.getElementsByClassName("FooterButton")[2].classList.remove("activeButtonBorder")
    document.getElementsByClassName("FooterButton")[0].classList.add("activeButtonBorder")
    setActiveArray(false)
    setCompletedArray(false)
  }
  
  const completedListData = () => {
    document.getElementsByClassName("FooterButton")[0].classList.remove("activeButtonBorder")
    document.getElementsByClassName("FooterButton")[1].classList.remove("activeButtonBorder")
    document.getElementsByClassName("FooterButton")[2].classList.add("activeButtonBorder")
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
                 const checkedLine = item.isChecked
                  return (
                    <>
                      <li className={`listData ${checkedLine ? "completed" : "pending"}`} key={i}>
                        <input type="checkbox" className="checkBoxStyle" 
                        isChecked={item.isChecked}
                        onChange={() => toggleChecked(item.id)}/>
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
          <li><button className="FooterButton active" onClick={() => allListData()}>All</button></li>
          <li><button className="FooterButton" onClick={() => activeListData()}>Active</button></li>
          <li><button className="FooterButton" onClick={() => completedListData()}>Completed</button></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
