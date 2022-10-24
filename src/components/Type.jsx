import React from 'react'
import Input from './InputList/Input'
import './Type.css'
import { ReactComponent as Check } from '../assets/todo-app-main/images/icon-check.svg'
import { ReactComponent as Close } from '../assets/todo-app-main/images/icon-cross.svg'

const Type = () => {
  const [task, setTask] = React.useState([])
  const [check, setCheck] = React.useState([])
  const [remove, setRemove] = React.useState([])

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
    if (window.localStorage.length !== 0 && task.length > 0) {
      setTask(JSON.parse(window.localStorage.getItem('task')))
    }
  }, [])

  React.useEffect(() => {
    if (task.length !== 0) {
      window.localStorage.setItem('task', [JSON.stringify(task)])
    } else {
      window.localStorage.setItem('task', [])
    }
  }, [task, check, remove])
  React.useEffect(() => {
    task.filter(item => {
      return check.includes(item.id) ? item.check == true : ''
    })
  }, [check])

  // React.useEffect(() => {
  //   // task.filter(item => {
  //   //   return !remove.includes(item.id) ? setTask([item]) : ''
  //   // })
  //   task.find((item, index) => {
  //     console.log(item)
  //     return remove.includes(item.id) ? task.splice(index, index) : ''
  //   })
  // }, [remove])

  return (
    <>
      <Input type="text" onKeyDown={handleEnter} />
      <div className={'taskContainer'}>
        {task
          ? task.map((item, index) => {
              function handleCheck() {
                item.check = !item.check

                if (check.length !== 0) {
                  window.localStorage.setItem('check', [JSON.stringify(check)])
                }

                setCheck([...check, item.id])
              }

              function handleDelete() {
                item.id = 0
                if (item.id === 0) task.splice(index, index)
                if (index === 0) task.shift()

                setRemove([item])
                console.log(remove)
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
            <span>All</span>
            <span>Active</span>
            <span>Complete</span>
          </div>
          <div className="Clear">
            <span>Clear Completed</span>
          </div>
        </div>
      </div>
    </>
  )
}
export default Type
