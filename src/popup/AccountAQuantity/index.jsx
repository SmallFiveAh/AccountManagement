import { useState, useEffect } from 'react'
import './index.css';
function AccountAQuantity() {
  // 实现获取本地存储accounts账号数量的逻辑
  const [accountQuantity, setAccountQuantity] = useState(0);
  const [todayQuantity, setTodayQuantity] = useState(0);
  useEffect(() => { 
    const accounts = localStorage.getItem('accounts');
    if (accounts) {
      const parsedAccounts = JSON.parse(accounts);
      setAccountQuantity(parsedAccounts.length);
      // 计算当天设置的账号数量
      // 遍历parsedAccounts，把id值转成Date对象，判断是否是今天
      const today = new Date();
      const todayAccounts = parsedAccounts.filter(account => {
        const accountDate = new Date(account.id);
        return accountDate.getFullYear() === today.getFullYear() &&
                accountDate.getMonth() === today.getMonth() &&
                accountDate.getDate() === today.getDate();
      });
      setTodayQuantity(todayAccounts.length);
    }
  }, []);
  return (
    <div className="account-quantity">
      <div className="text-container">
        <div className="Settings-quantity-text">当天设置数量&#65306;{todayQuantity}</div>
        <div className="total-account-quantity-text">总计账号数量&#65306;{accountQuantity}</div>
      </div>
    </div>
  );
}

export default AccountAQuantity;