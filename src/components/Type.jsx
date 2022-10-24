import React from 'react'
import Input from './InputList/Input'
import './Type.css'
import { ReactComponent as Check } from '../assets/todo-app-main/images/icon-check.svg'
import { ReactComponent as Close } from '../assets/todo-app-main/images/icon-cross.svg'

const Type = () => {
  const [task, setTask] = React.useState([])
  const [check, setCheck] = React.useState([])
  const [all, setAll] = React.useState([])
  const [remove, setRemove] = React.useState(false)
  const [active, setActive] = React.useState([])
  const [completed, setCompleted] = React.useState([])

  function handleEnter(e) {
    if (e.keyCode === 13 && !e.target.value == '') {
      setTask([
        ...task,
        {
          check: false,
          text: e.target.value,
          id: Math.floor(Math.random() * 1000)
        }
      ])
      e.target.value = ''
    }
  }

  React.useEffect(() => {
    const getTask = window.localStorage.getItem('task') ? true : false
    if (window.localStorage.length !== 0 && getTask) {
      setTask(JSON.parse(window.localStorage.getItem('task')))
    }
  }, [])

  React.useEffect(() => {
    if (task.length !== 0) {
      window.localStorage.setItem('task', [JSON.stringify(task)])
    } else {
      window.localStorage.setItem('task', [])
    }
    task.map((item, index) => {
      if (item.check && !completed.includes(item)) {
        setCompleted([...completed, item])
      } else if (!item.check && completed.includes(item)) {
        return completed.splice(index, index)
      }
      return completed
    })

    // task.map((item, index) => {
    //   if (!item.check && !active.includes(item)) {
    //     setActive([...active, item])
    //   } else if (item.check && active.includes(item)) {
    //     return active.splice(index, index)
    //   }
    //   return active
    // })
  }, [task, check, remove])

  function handleCompleted() {
    setAll([...task])
    completed.filter(item => {
      if (item.check) {
        setTask([...completed])
      }
    })
  }
  function showAll() {
    setTask([...all])
  }
  // function showActive() {
  //   setAll([...task])
  //   active.filter(item => {
  //     if (!item.check) {
  //       setTask([...active])
  //     }
  //   })
  // }
  function handleClear() {
    task.filter((item, index) => {
      item.check ? (item.id = 0) : ''
      item.id == 0 ? setTask([]) : console.log(false)
      return console.log(task)
    })
  }
  return (
    <>
      <Input type="text" onKeyDown={handleEnter} />
      <div className={'taskContainer'}>
        {task
          ? task.map((item, index) => {
              function handleCheck() {
                item.check = !item.check

                setCheck([...check, item.id])
              }

              function handleDelete() {
                item.id = 0
                if (item.id === 0) task.splice(index, index)
                if (index === 0) task.shift()
                completed.filter(item => {
                  item.id > 0
                    ? setCompleted([...completed, item])
                    : setCompleted([])
                })

                setRemove(!remove)
              }

              return (
                <div key={item.id} className={'task'}>
                  <div className={item.check ? 'IconText check' : 'IconText'}>
                    <div className={'iconCheck'} onClick={handleCheck}>
                      <Check />
                    </div>
                    <span>{item.text}</span>
                  </div>
                  <Close className={'closeIcon'} onClick={handleDelete} />
                </div>
              )
            })
          : ''}
        <div className="taskInfos">
          <div className="taskCount">
            {task.length == 1 ? (
              <span>{task.length} item left</span>
            ) : (
              <span>{task.length} items left</span>
            )}
          </div>
          <div className="selectTask">
            <span onClick={showAll}>All</span>
            <span>Active</span>
            <span onClick={handleCompleted}>Completed</span>
          </div>
          <div className="Clear">
            <span onClick={handleClear}>Clear Completed</span>
          </div>
        </div>
      </div>
    </>
  )
}
export default Type
