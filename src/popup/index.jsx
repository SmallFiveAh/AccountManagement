import { useState } from 'react'
import PopupHeader from './PopupHeader';
import AccountAQuantity from './AccountAQuantity';
import UseFrequentRate from './UseFrequentRate';
import './index.css';

function popup() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <PopupHeader />
        <AccountAQuantity />
        <UseFrequentRate />
    </div>
  )
}

export default popup;
