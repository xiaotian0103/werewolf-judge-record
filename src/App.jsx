import React, { useState, useEffect, useRef } from 'react'
import PlayerManager from './components/PlayerManager'
import RoleAssign from './components/RoleAssign'
import RoundLog from './components/RoundLog'
import Timer from './components/Timer'
import ExportPanel from './components/ExportPanel'
import dayjs from 'dayjs'

const STORAGE_KEY = 'werewolf_judge_state_v1'

export default function App(){
  const [state, setState] = useState(() => {
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : {
        players: [],
        roles: [],
        logs: [],
        round: 1,
        phase: '白天' // or 黑夜
      }
    }catch(e){
      return {players:[], roles:[], logs:[], round:1, phase:'白天'}
    }
  })

  useEffect(()=> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const addLog = (entry) => {
    setState(s => ({...s, logs: [...s.logs, {...entry, time: dayjs().format()}]}))
  }

  const updatePlayers = (players) => setState(s => ({...s, players}))
  const updateRoles = (roles) => setState(s => ({...s, roles}))

  const nextPhase = () => {
    setState(s => {
      const next = s.phase === '白天' ? '黑夜' : '白天'
      const nextRound = next === '白天' ? s.round + 1 : s.round
      return {...s, phase: next, round: nextRound}
    })
  }

  return (
    <div className="app">
      <header>
        <h1>狼人杀 — 法官记录器</h1>
        <div className="meta">回合: {state.round} · 阶段: {state.phase}</div>
      </header>

      <main>
        <section className="left">
          <PlayerManager players={state.players} onChange={updatePlayers} logs={state.logs} addLog={addLog}/>
          <RoleAssign players={state.players} roles={state.roles} onChange={updateRoles} addLog={addLog}/>
          <ExportPanel state={state}/>
        </section>

        <section className="right">
          <Timer enabled defaultSec={90} addLog={addLog}/>
          <div className="controls">
            <button onClick={nextPhase}>切换 白天/黑夜</button>
            <button onClick={()=>{ if(confirm('清空所有记录和玩家？')){ localStorage.removeItem(STORAGE_KEY); location.reload(); }}}>清空并重置</button>
          </div>
          <RoundLog logs={state.logs}/>
        </section>
      </main>

      <footer>
        <small>本地保存 (localStorage)。导出为 JSON/CSV 可用于复盘。</small>
      </footer>
    </div>
  )
}
