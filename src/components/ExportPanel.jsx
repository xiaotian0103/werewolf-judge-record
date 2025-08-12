import React from 'react'

export default function ExportPanel({state}){
  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], {type:'application/json'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'werewolf_record.json'; a.click(); URL.revokeObjectURL(url)
  }

  const downloadCSV = () => {
    // simple CSV for logs
    const rows = [['time','type','text'], ...state.logs.map(l=>[l.time, l.type, l.text])]
    const csv = rows.map(r=> r.map(c=> '"'+String(c).replace(/"/g,'""')+'"').join(',')).join('\n')
    const blob = new Blob([csv], {type:'text/csv'}); const url = URL.createObjectURL(blob)
    const a=document.createElement('a'); a.href=url; a.download='werewolf_logs.csv'; a.click(); URL.revokeObjectURL(url)
  }

  const printView = () => window.print()

  return (
    <div className="panel">
      <h2>导出 / 打印</h2>
      <div className="row">
        <button onClick={downloadJSON}>导出 JSON</button>
        <button onClick={downloadCSV}>导出 CSV（记录）</button>
        <button onClick={printView}>打印视图</button>
      </div>
    </div>
  )
}
