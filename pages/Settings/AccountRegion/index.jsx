import { useState } from 'react'
import './index.css'

function AccountRegion() {
  const [videoSrc, setVideoSrc] = useState('')
  // 要渲染的账号列表（可从 props 或接口获取）
  const [accounts, setAccounts] = useState([
    { id: 1, name: '账号账号账号账号账号', icon: '../../../public/resource/img/icon-48.png' },
    { id: 2, name: '账号账号号账号账号账号账号账号账', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' }
    // ...更多项...
  ])

  const handleAddAccount = () => {
    const newAccount = {
      id: accounts.length + 1,
      name: `账号${accounts.length + 1}`,
      icon: '../../../public/resource/img/icon-48.png'
    }
    setAccounts([...accounts, newAccount])
  }

  console.log(accounts.length);
  
  return (
    <div className="header-container">
      {accounts.map(account => {
        const label = account.name.length > 5 ? account.name.slice(0, 5) + '...' : account.name
        return (
          <div className="account-container" key={account.id}>
            <div className="icon-container">
              <div className="icon-box">
                <img src={account.icon} title={account.name} alt={account.id} />
                <span>{label}</span>
              </div>
            </div>
          </div>
        )
      })}
      <div className="add-account-container">
        <div className="add-btn" onClick={handleAddAccount}>
          <div className="add-icon-btn">
            <svg
              width={32}
              height={32}
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: "white", opacity: "0.5" }}
            >
              {/* 水平线 */}
              <line
                x1={3}
                y1={8}
                x2={13}
                y2={8}
                stroke="currentColor"
                strokeWidth={1}
              />
              {/* 垂直线 */}
              <line
                x1={8}
                y1={3}
                x2={8}
                y2={13}
                stroke="currentColor"
                strokeWidth={1}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AccountRegion;