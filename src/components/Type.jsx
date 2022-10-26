import React from 'react'
import Input from './InputList/Input'
import './Type.css'
import { GlobalContext } from './ThemeContext'
import { ReactComponent as CloseDark } from '../assets/todo-app-main/images/icon-cross-dark.svg'
import { ReactComponent as Check } from '../assets/todo-app-main/images/icon-check.svg'
import { ReactComponent as Close } from '../assets/todo-app-main/images/icon-cross.svg'

const Type = () => {
  const [task, setTask] = React.useState([])
  const [all, setAll] = React.useState([])
  const [remove, setRemove] = React.useState(false)
  const [active, setActive] = React.useState(false)
  const [completed, setCompleted] = React.useState(false)
  const [theme] = React.useContext(GlobalContext)

  const body = document.querySelector('body')
  theme ? body.classList.remove('darkBody') : body.classList.add('darkBody')
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
  }, [task, remove])

  function handleCompleted() {
    setAll([...task])
    setCompleted(true)
    setActive(false)
  }
  function showAll() {
    setTask([...all])
    setCompleted(false)
    setActive(false)
  }
  function showActive() {
    setAll([...task])
    if (completed) {
      setAll([...task])
      setCompleted(false)
    }
    setActive(true)
  }

  return (
    <>
      <Input type="text" onKeyDown={handleEnter} />
      <div className={theme ? 'taskContainer' : 'taskContainerDark'}>
        {task && !completed && !active
          ? task.map((item, index) => {
              function handleCheck() {
                item.check = !item.check

                setRemove(!remove)
              }

              function handleDelete() {
                item.id = 0

                task.filter((item, index) => {
                  item.id === 0 ? task.splice(index, 1) : ''
                  return true
                })

                setRemove(!remove)
              }

              return (
                <div key={item.id} className={theme ? 'task' : 'taskDark'}>
                  <div className={item.check ? 'IconText check' : 'IconText'}>
                    <div className={'iconCheck'} onClick={handleCheck}>
                      {item.check ? <Check /> : ''}
                    </div>
                    <span>{item.text}</span>
                  </div>
                  {theme ? (
                    <Close className={'closeIcon'} onClick={handleDelete} />
                  ) : (
                    <CloseDark className={'closeIcon'} onClick={handleDelete} />
                  )}
                </div>
              )
            })
          : completed
          ? all.map(item => {
              function handleCheck() {
                item.check = !item.check

                setRemove(!remove)
              }

              function handleDelete() {
                item.id = 0

                task.filter((item, index) => {
                  item.id === 0 ? task.splice(index, 1) : ''
                  return true
                })

                setRemove(!remove)
              }

              return item.check ? (
                <div key={item.id} className={theme ? 'task' : 'taskDark'}>
                  <div className={item.check ? 'IconText check' : 'IconText'}>
                    <div className={'iconCheck'} onClick={handleCheck}>
                      {item.check ? <Check /> : ''}
                    </div>
                    <span>{item.text}</span>
                  </div>
                </div>
              ) : (
                ''
              )
            })
          : active
          ? all.map(item => {
              function handleCheck() {
                item.check = !item.check

                setRemove(!remove)
              }

              return !item.check ? (
                <div key={item.id} className={theme ? 'task' : 'taskDark'}>
                  <div className={item.check ? 'IconText check' : 'IconText'}>
                    <div className={'iconCheck'} onClick={handleCheck}>
                      {item.check ? <Check /> : ''}
                    </div>
                    <span>{item.text}</span>
                  </div>
                </div>
              ) : (
                ''
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
            <span
              className={!completed & !active ? 'all' : ''}
              onClick={showAll}
            >
              All
            </span>
            <span
              className={!completed & active ? 'active' : ''}
              onClick={showActive}
            >
              Active
            </span>
            <span
              className={completed & !active ? 'completed' : ''}
              onClick={handleCompleted}
            >
              Completed
            </span>
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
