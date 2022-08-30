import React, {useEffect, useState, useContext} from 'react'
import { LogContext } from '../../Contexts/LogContext'

const LogEntry = (props) => {
  const [entry, setEntry] = useState(props.entry)
  const [position, setPosition] = useState(props.position)
  const {log, setLog} = useContext(LogContext)

  return (
    <span className='log-entry'>
      <strong className='turn'>Turn {position}:</strong> {entry}
    </span>
  )
}

export default LogEntry