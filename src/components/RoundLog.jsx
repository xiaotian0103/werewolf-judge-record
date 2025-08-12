import React from 'react'

export default function RoundLog({logs=[]}){
  return (
    <div className="panel">
      <h2>回合记录</h2>
      <ol className="logs">
        {logs.map((l,idx)=>(
          <li key={idx}>
            <div className="log-time">{new Date(l.time).toLocaleString()}</div>
            <div className="log-text">[{l.type}] {l.text}</div>
          </li>
        ))}
      </ol>
    </div>
  )
}
