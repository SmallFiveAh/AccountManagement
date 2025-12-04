import { useState } from 'react';
import './index.css';

function ImportAccount({ onClose }) {
    const [fileName, setFileName] = useState('');
    const [fileContent, setFileContent] = useState(''); // 新增状态存储文件内容
    const [description, setDescription] = useState('');
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            
            // 使用 FileReader 读取文件内容
            const reader = new FileReader();
            reader.onload = (event) => {
                setFileContent(event.target.result);
                setDescription(event.target.result); // 将文件内容设置到textarea中
            };
            reader.readAsText(file);
        }
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    return (
        <div className="choose-export-panel-Import">
            <div className="Add-Account-Panel-Import" onClick={(e) => e.stopPropagation()}>
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
                        placeholder="请输入该账号使用的说明...（可选）" 
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