import {  } from 'react';

function Masklayer() {
  return (
    <div className="home-wallpaper h-full w-full">
        <video 
            className="h-full w-full object-cover" 
            src="" 
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