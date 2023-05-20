import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import './app.css'
import TodoCreate from './components/TodoCreate'
import { list } from './types/type_list'
import TodoCard from './components/TodoCard'

const localstorage = localStorage.getItem('TodoList')
const localstorageParsed = localstorage ? JSON.parse(localstorage) : []

function App() {
  const [toggleButton, SetToggleButton] = useState<boolean>(false)
  const [mensage, SetMensage] = useState<string>('')
  const [data, SetData] = useState<string>('')
  const [list, SetList] = useState<Array<object>>(localstorageParsed)
  const [checked, SetChecked] = useState<boolean>(false)

  useEffect(() => {
    localStorage.setItem('TodoList', JSON.stringify(list))
  }, [list])

  const customId = uuidv4()

  const handleClick = () => {
    SetToggleButton(true)

    if (toggleButton) {
      SetToggleButton(false)
    }
  }

  return (
    <>
      <header>
        <h1>TODOList</h1>
      </header>

      <main>
        <button
          className="btn-create"
          type="button"
          onClick={() => handleClick()}
        ></button>

        {toggleButton === true && (
          <TodoCreate
            SetList={SetList}
            list={list}
            SetToggleButton={SetToggleButton}
            id={customId}
            mensage={SetMensage}
            data={SetData}
            msg={mensage}
            dt={data}
          />
        )}

        {list?.map((value: list | any) => (
          <TodoCard
            key={value.id}
            SetChecked={SetChecked}
            checked={checked}
            SetList={SetList}
            list={list}
            id={value.id}
            msg={value.mensage}
            date={value.date}
          />
        ))}
      </main>
    </>
  )
}

export default App
