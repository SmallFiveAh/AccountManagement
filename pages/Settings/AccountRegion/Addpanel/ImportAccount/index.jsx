import { useState } from 'react';
import './index.css';

function ImportAccount({ onClose }) {
    const [fileName, setFileName] = useState('');
    const [description, setDescription] = useState('234234234');
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    return (
        <div className="choose-export-panel" onClick={onClose}>
            <div className="Add-Account-Panel" onClick={(e) => e.stopPropagation()}>
                <div className="complete-btn" title="关闭" onClick={onClose}>&times;</div>
                <h2 className="panel-title">导入账号</h2>
                <div className="file-upload-container">
                    <label className="file-upload-label">
                        选择文件
                        <input 
                            type="file" 
                            accept=".json,.csv,.txt" 
                            onChange={handleFileChange}
                            className="file-input"
                        />
                    </label>
                    {fileName && (
                        <div className="file-name">
                            已选择: {fileName}
                        </div>
                    )}
                </div>
                <div className="Beautify-json-Import">
                    <textarea 
                        name="description" 
                        placeholder="请输入该账号使用的说明..." 
                        className="Beautify-json-Import-textarea"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                    <div className="char-count">{description.length} 字</div>
                </div>
                <div className="import-instructions">
                    <button className="import-btn">导入</button>
                </div>
            </div>
        </div>
    );
}

export default ImportAccount;