import React, {useState, useEffect, useRef} from 'react'

export default function Timer({enabled=true, defaultSec=90, addLog}){
  const [sec, setSec] = useState(defaultSec)
  const [running, setRunning] = useState(false)
  const timerRef = useRef(null)

  useEffect(()=>{
    if(running){
      timerRef.current = setInterval(()=> setSec(s=> {
        if(s<=1){ clearInterval(timerRef.current); setRunning(false); addLog && addLog({type:'timer', text:'计时结束'}) ; return 0 }
        return s-1
      }), 1000)
    }
    return ()=> clearInterval(timerRef.current)
  }, [running])

  const start = ()=> { setSec(defaultSec); setRunning(true); addLog && addLog({type:'timer', text:`开始计时 ${defaultSec} 秒`}) }
  const stop = ()=> { setRunning(false); clearInterval(timerRef.current); addLog && addLog({type:'timer', text:'停止计时'}) }
  const setCustom = ()=> {
    const v = parseInt(prompt('输入秒数（整数）', String(defaultSec)))
    if(!isNaN(v)) { setSec(v) }
  }

  return (
    <div className="panel">
      <h2>发言计时器</h2>
      <div className="timer-display">{sec}s</div>
      <div className="row">
        <button onClick={start} disabled={running}>开始</button>
        <button onClick={stop} disabled={!running}>停止</button>
        <button onClick={setCustom}>设置秒数</button>
      </div>
      <p className="note">计时会在结尾记录日志，法官可手动开始/停止。</p>
    </div>
  )
}
