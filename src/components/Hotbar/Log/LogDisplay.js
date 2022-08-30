import React, {useState, useEffect, useContext} from 'react'
import { LogContext } from '../../Contexts/LogContext'
import LogEntry from './LogEntry'

const LogDisplay = () => {
  const {log, setLog} = useContext(LogContext)
  const [logEntries, setLogEntries] = useState()
  
  useEffect(() => {
    let logNum = 0
    let logArray = log.map(entry => {
      logNum += 1
      return <LogEntry key={logNum} entry={entry} position={logNum}/>
    })
    setLogEntries(logArray)
  }, [log])

  console.log(logEntries)

  return (
    <div className='log-display'>
        {logEntries}
    </div>
  )
}

export default LogDisplay