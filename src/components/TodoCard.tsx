import { useEffect, useState } from 'react'

import PropTypes, { element } from 'prop-types'

import { Calendar, Check, PencilSimple, Trash } from '@phosphor-icons/react'

import './todoCard.css'
import { list } from '../types/type_list'

function TodoCard(props: any) {
  const [ hover, SetHover ] = useState<boolean>(false)

  useEffect(() => {
    props.list.filter((element: list) => {
      const htmlE = document.getElementById(element.id) as HTMLElement
      if (element.finished) {
        htmlE.style.backgroundColor = '#5C5C5C'
      }
      if (!element.finished) {
        htmlE.style.backgroundColor = 'white'
      }
    })
  }, [props.list])

  const handleChecked = (e: any) => {
    const card_id = e.target.parentNode.id
    console.log(e.target)
    const getLocalStorage = localStorage.getItem('TodoList')
    const parse = getLocalStorage ? JSON.parse(getLocalStorage) : []

    const task: list = parse.find((element: list) => element.id === card_id)

    if (task.finished === true) {
      task.finished = false
    
      props.SetList(parse)
      return
    }

    task.finished = true
    
    props.SetList(parse)
  }

  const handleRemove = (e: any) => {
    const card_id: string = e.target.parentNode.id

    const removed: Array<list> = props.list.filter((element: list) => element.id != card_id)
    const task: list = props.list.find((element: list) => element.id === card_id)

    if (!task.finished) {
      window.alert('Task não finalizada!')
    }

    if (task.finished === true) {
      props.SetList(removed)
    }
  }

  return (
    <div className='containerCard' id={ props.id }>
      <div className='card'>

        <div className='firt-part'>
          <p className='msg'>{props.msg}</p>
        </div>

        <hr />

        <div className='second-part' id={ props.id }>
          <Check size={24} id='icon-check' onClick={(e) => { handleChecked(e) }}/>
          
          { !hover ? <Calendar size={24} id='icon-calendar' onClick={() => {
            SetHover(true)
          }}/>
          : <p className='date' onClick={ () => { SetHover(false) }}>{props.date}</p>
        }
          <PencilSimple size={24} id='icon-edit'/>

          <Trash size={24} className="icon-remove" id={ props.id } onClick={ (e) => handleRemove(e) }/>
        </div>

      </div>
    </div>
  );
}

TodoCard.propTypes = {
  id: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    mensage: PropTypes.string,
    date: PropTypes.string,
  })).isRequired,
  SetList: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  SetChecked: PropTypes.func
}

export default TodoCard;