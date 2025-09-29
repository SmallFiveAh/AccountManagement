import { useState } from 'react'
import './index.css';

function Masklayer() {
  return (
    <div className="home-wallpaper h-full w-full">
        <video 
            className="h-full w-full object-cover" 
            src="../resource/video/background.mp4" 
            autoPlay 
            loop 
            muted
        ></video>
        {/* 添加遮罩层，防止用户直接操作视频 */}
        <div className="video-overlay"></div>
    </div>
  );
}
export default Masklayer;