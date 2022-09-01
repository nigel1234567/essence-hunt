import React, {useEffect, useState, useContext} from 'react'

const LogEntry = (props) => {
  const [entry, setEntry] = useState(props.entry)
  const [position, setPosition] = useState(props.position)

  return (
    <span className='log-entry'>
      <strong className='turn'>{position}.</strong> {entry}
    </span>
  )
}

export default LogEntry