import { useRef } from 'react';
import './index.css';

function Addcategory({ onClose }) {
    return (
        <div className="Addcategory">
            <div className="category-name">
                <span>分类名称</span>
                <input type="text" placeholder='请输入分类名称' />
            </div>
            <div className="category-icon">
                <span>分类图标</span>
                <div className="icon-upload">
                    <input type="file" /> 
                    <i className="icon-upload"></i>
                    <span>点击上传或拖拽文件到此处</span>
                </div>
            </div>
            <div className="form-actions">
                <button 
                    type="button" 
                    onClick={onClose}
                    className="btn btn-secondary"
                >
                    取消
                </button>
                <button 
                    type="submit"
                    className="btn btn-primary"
                >
                    保存
                </button>
            </div>
        </div>
    )
}

export default Addcategory;