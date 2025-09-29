import { useState } from "react";
import PopupTitle from './PopupTitle';
import PopupSettings from './PopupSettings';
import './index.css';

function PopupHeader() {
    const [count, setCount] = useState(0)
    return (
        <div className="popup-header">
            <PopupTitle />
            <PopupSettings />
        </div>
    );
}
export default PopupHeader;