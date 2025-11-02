import { useState } from 'react'
import './index.css'

function AccountRegion() {
  const [videoSrc, setVideoSrc] = useState('')
    // 要渲染的账号列表（可从 props 或接口获取）
  const accounts = [
    { id: 1, name: '账号账号账号账号账号', icon: '../../../public/resource/img/icon-48.png' },
    { id: 2, name: '账号账号号账号账号账号账号账号账', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    { id: 3, name: '账号3', icon: '../../../public/resource/img/icon-48.png' },
    // ...更多项...
  ]
  return (
      <div className="header-container">
        {accounts.map(account => {
          const label = account.name.length > 5 ? account.name.slice(0, 5) + '...' : account.name
          return (
            <div className="account-container">
              <div className="icon-container">
                <div className="icon-box" key={account.id}>
                  <img src={account.icon} title={account.name} alt={account.id} />
                  <span>{label}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
  )
}
export default AccountRegion;