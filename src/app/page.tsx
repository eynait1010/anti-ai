'use client'
import "./globals.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { Progress, message } from "antd";

function App() {
  const [imgName, setImgName] = useState("A1");
  const [result, setResult] = useState("");
  const [canSelect, setCanSelect] = useState(true);
  // const [showProgress, setShowProgress] = useState(false);
  // const [count, setCount] = useState(0);

  const src = useMemo(() => `./img/${imgName}.png`, [imgName]);
  const backgroundColor = useMemo(() => {
    if (result === "right") {
      return "#80ca3d";
    } else if (result === "wrong") {
      return "#FF0000";
    } else {
      return "#FFFFFF";
    }
  }, [result]);

  useEffect(() => {
    document.addEventListener("keyup", PopupKeyUp, false);
    return () => {
      document.removeEventListener("keyup", PopupKeyUp, false);
    };
  }, [imgName, canSelect]);

  const PopupKeyUp = (e: any) => {
    if (!canSelect) {
      return;
    }
    setCanSelect(false);
    if (e.code === "KeyY") {
      handleKeyY();
    }
    if (e.code === "KeyN") {
      handleKeyN();
    }
  };
  console.log(imgName);

  function handleKeyY() {
    console.log(imgName, imgName.at(0));
    if (imgName.at(0) === "A") {
      setResult("right");
      message.success("选择正确～ 🎉🎉🎉");
    } else {
      setResult("wrong");
      message.error("选择错误～ 🤷🤷🤷");
    }
    setTimeout(changeToNextImgSource, 2000);
    setCanSelect(false);
    // setShowProgress(true);
  }
  function handleKeyN() {
    console.log(imgName, imgName.at(0));

    if (imgName.at(0) === "B") {
      setResult("right");
      message.success("选择正确～ 🎉🎉🎉");
    } else {
      setResult("wrong");
      message.error("选择错误～ 🤷🤷🤷");
    }
    setTimeout(changeToNextImgSource, 2000);
    setCanSelect(false);
    // setShowProgress(true);
  }

  // const changeCount = () => {
  //   let currentCount = 1;
  //   const interval = setInterval(() => {
  //     console.log(currentCount);
  //     if (currentCount <= 100) {
  //       setCount(currentCount);
  //       currentCount += 2;
  //     } else {
  //       setTimeout(() => {
  //         setCount(0);
  //       }, 40);
  //       clearInterval(interval);
  //     }
  //   }, 20); // 每次增加的间隔时间，根据需要可以调整

  //   setTimeout(() => {
  //     setTimeout(() => {
  //       setCount(0);
  //     }, 20);
  //     clearInterval(interval);
  //   }, 2000); // 总共变化的时间
  // };

  function changeToNextImgSource() {
    let flag = Math.random() > 0.5 ? "A" : "B";
    let num;
    if (flag === "A") {
      num = Math.ceil(Math.random() * 11);
    } else {
      num = Math.ceil(Math.random() * 20);
    }
    setImgName(flag + num);
    setResult("");
    // setShowProgress(false);
    setCanSelect(true);
  }

  return (
    <div
      className="App"
      style={{
        backgroundColor,
      }}
    >
      <div className="img-container">
        <img className="source-img" src={src} />
      </div>

      <div className="prompt">
        <div>该图片是否是人工智能生成？ Y/N</div>
      </div>
    </div>
  );
}

export default App;