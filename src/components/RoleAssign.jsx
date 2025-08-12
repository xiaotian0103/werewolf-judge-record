import React, {useState} from 'react'

export default function RoleAssign({players, roles, onChange, addLog}){
  const [preset, setPreset] = useState('标准')

  const defaultRoles = ['狼人','狼人','预言家','女巫','猎人','村民','村民','村民']

  const randomAssign = () => {
    if(players.length===0) return alert('请先添加玩家')
    const pool = roles && roles.length?roles:defaultRoles
    const shuffled = [...pool].sort(()=>Math.random()-0.5)
    const assign = players.map((p,i)=> ({...p, role: shuffled[i%shuffled.length] || '村民'}))
    onChange(assign)
    addLog && addLog({type:'assign_roles', text:'随机分牌（仅记录）'})
  }

  const manualSet = (id, role) => {
    onChange(players.map(p=>p.id===id?{...p, role}:p))
  }

  return (
    <div className="panel">
      <h2>角色分配</h2>
      <div className="row">
        <button onClick={randomAssign}>随机发牌（仅法官可见）</button>
        <button onClick={()=>{ const r = prompt('自定义角色，用逗号分隔（会循环分配）', roles.join(',')); if(r!==null){ onChange(players.map(p=>({ ...p, role: null }))); onChange(players.map(p=>p)); } }}>编辑角色池</button>
      </div>
      <ul className="assign-list">
        {players.map(p=>(
          <li key={p.id}>
            <span className="seat">{p.seat}</span>
            <strong>{p.name}</strong>
            <select value={p.role||''} onChange={e=>manualSet(p.id, e.target.value)}>
              <option value="">（空）</option>
              <option>狼人</option>
              <option>预言家</option>
              <option>女巫</option>
              <option>猎人</option>
              <option>村民</option>
            </select>
          </li>
        ))}
      </ul>
      <p className="note">注：发牌仅记录于本地，角色默认为法官可见。</p>
    </div>
  )
}
