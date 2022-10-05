import React, {useState, useEffect, useContext} from 'react'
import { PlayerContext } from '../../Contexts/PlayerContext'
import LogEntry from './LogEntry'

const LogDisplay = () => {
  const {player, setPlayer} = useContext(PlayerContext)
  const [log, setLog] = useState(player.log)
  const [logEntries, setLogEntries] = useState()
  
  // Update log whenever player object changes
  useEffect(() => {
    setLog(player.log)
  }, [player])

  useEffect(() => {
    let logNum = 0
    let logArray = log.map(entry => {
      logNum += 1
      return <LogEntry key={logNum} entry={entry} position={logNum}/>
    })
    setLogEntries(logArray)
  }, [log, player.load])

  return (
    <div className='log-display'>
        {logEntries}
    </div>
  )
}

export default LogDisplay