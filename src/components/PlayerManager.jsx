import React, {useState} from 'react'

export default function PlayerManager({players, onChange, addLog}){
  const [name, setName] = useState('')

  const add = () => {
    if(!name.trim()) return
    const newPlayers = [...players, {id: Date.now(), name: name.trim(), alive: true, seat: players.length+1}]
    onChange(newPlayers)
    setName('')
    addLog && addLog({type:'add_player', text:`添加玩家 ${name.trim()}`})
  }

  const toggleAlive = (id) => {
    const newPlayers = players.map(p => p.id===id ? {...p, alive: !p.alive} : p)
    onChange(newPlayers)
  }

  const remove = (id) => {
    if(!confirm('删除玩家？')) return
    onChange(players.filter(p=>p.id!==id))
  }

  const rename = (id, value) => {
    onChange(players.map(p=>p.id===id?{...p, name:value}:p))
  }

  return (
    <div className="panel">
      <h2>玩家管理</h2>
      <div className="input-row">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="输入玩家昵称，回车或点击添加" onKeyDown={e=>e.key==='Enter' && add()}/>
        <button onClick={add}>添加</button>
      </div>
      <ul className="player-list">
        {players.map(p=>(
          <li key={p.id}>
            <input value={p.name} onChange={e=>rename(p.id, e.target.value)}/>
            <span className={`alive ${p.alive?'':'dead'}`} onClick={()=>toggleAlive(p.id)} title="点击标记生死">{p.alive?'存活':'阵亡'}</span>
            <button className="small" onClick={()=>remove(p.id)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
