import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { PageHeader, Empty } from 'antd';
import { SmallDashOutlined } from '@ant-design/icons';
import Toast, { T } from 'react-toast-mobile';
import './App.less';
import 'react-toast-mobile/lib/react-toast-mobile.css';

const Drawer = ({ isShowDrawer, onOpenChange, listImgSrc }) => (
  <div className={`drawer ${isShowDrawer ? 'show' : 'hide'}`}>
    <PageHeader
      className="site-page-header"
      onBack={onOpenChange}
      title="List ScreenShot"
    />
    <div className="site-page-content">
      {(!listImgSrc || listImgSrc.length === 0) && <Empty />}
      {listImgSrc && listImgSrc.length !== 0 && (
        <div className="list-img">
          {listImgSrc.map((src) => (
            <img src={src} className="img-content" alt="" />
          ))}
        </div>
      )}
    </div>
  </div>
);

function App() {
  const webcamRef = useRef(null);
  const [listImgSrc, setListImgSrc] = useState([]);
  const [imgBg, setImgBg] = useState(null);
  const [isShowDrawer, setIsShowDrawer] = useState(false);

  const capture = useCallback(() => {
    T.loading();
    const imageSrc = webcamRef.current.getScreenshot();
    setImgBg(imageSrc);
    setListImgSrc([...listImgSrc, imageSrc]);
    setTimeout(() => {
      T.loaded();
    }, 500);
  }, [listImgSrc]);

  const onOpenChange = (...args) => {
    console.log(args);
    setIsShowDrawer(!isShowDrawer);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-main-content">
          <div className="App-title">
            <div />
            <div className="title">Enouvo Camera Demo</div>
            <div />
          </div>
          <div className="App-video">
            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
            <Toast />
          </div>
          <div className="App-action">
            {!imgBg && (
              <SmallDashOutlined className="side-icon" onClick={onOpenChange} />
            )}
            {imgBg && (
              <img
                src={imgBg}
                className="App-list-image-icon side-icon"
                onClick={onOpenChange}
                alt=""
              />
            )}
            <div className="outer-circle" onClick={capture}>
              <div className="inner-circle" onClick={capture}></div>
            </div>
            <div className="side-icon" />
          </div>
          <Drawer
            isShowDrawer={isShowDrawer}
            onOpenChange={onOpenChange}
            listImgSrc={listImgSrc}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
