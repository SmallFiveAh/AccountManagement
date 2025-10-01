import { useState } from 'react'
import './index.css'

function SettingsPanel () { 
    return (
        <div id="add-account-modal" className="modal-overlay" style={{ display: 'flex' }}>
            <div className="modal-content">
                <button className="complete-btn" title="关闭">&times;</button>
                <div className="modal-body">
                    {/* 模态框主体内容 */}
                </div>
            </div>
        </div>
    )
}

export default SettingsPanel;
