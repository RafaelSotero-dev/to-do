import PropTypes from 'prop-types'

import './todoCreate.css'
import { useEffect } from 'react'
import { compareDate } from '../utils/date'

function TodoCreate(props: any) {
  
  useEffect(() => {
    props.SetList(props.list)
  }, [props.list])

  const handleClick = () => {
    const dt = String(props.dt).replaceAll('-', ' ').split(' ').reverse().join('/')
    const input = document.getElementById('date-btn') as HTMLElement

    if (compareDate(props.dt) === 'Formato invalido') {
      input.style.border = '1px solid red'
      window.alert('Formato invalido')
      return
    }

    if (compareDate(props.dt) === 'A data informada precisa ser maior que a data de hoje') {
      input.style.border = '1px solid red'
      window.alert('A data informada precisa ser maior que a data de hoje')
      return
    }

    if (props.msg && props.dt) {
      input.style.border = '1px solid black'
      props.SetList((prev: any) => [...prev, {
        id: props.id,
        mensage: props.msg,
        date: dt,
        finished: false
      }])
    }

    props.mensage('')
    props.data('')
    props.SetToggleButton(false)
  }

  return (
    <div className='containerTodo'>
      <form onSubmit={ (e) => e.preventDefault()}>
        <input className='int-content' type="text" value={ props.msg } placeholder='Digite aqui' onChange={ (e) => { props.mensage(e.target.value) } } required />
        <div>
          <input className='int-data' type="date" id="date-btn" value={ props.dt } onChange={ (e) => { props.data(e.target.value) }  } required/>
          <button type='button' onClick={ () => { handleClick() } }>Submit</button>
        </div>
      </form>
    </div>
  )
}

TodoCreate.propTypes = {
  id: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  dt: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    mensage: PropTypes.string,
    date: PropTypes.string,
  })).isRequired,
  mensage: PropTypes.func.isRequired,
  data: PropTypes.func.isRequired,
  SetList: PropTypes.func.isRequired,
  SetToggleButton: PropTypes.func.isRequired,
}

export default TodoCreate;