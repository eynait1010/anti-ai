'use client'
import "./globals.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCorrect } from "./message-correct";
import { MessageWrong } from "./message-wrong";
import { message } from "antd";

function App() {
  const [imgName, setImgName] = useState("A1");

  const [canSelect, setCanSelect] = useState(true);
  const [isCorrecct, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  let timer = useRef<any>(null)

  useEffect(() => {
    timer.current = setInterval(() => { changeToNextImgSource() }, 20 * 1000)
    return () => {
      if (timer.current) {
        clearInterval(timer.current)
      }
    }
  }, [])

  const src = useMemo(() => `./img/${imgName}.png`, [imgName]);

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
      onCorrect()
    } else {
      onWrong()
    }
    setTimeout(changeToNextImgSource, 2000);
    setCanSelect(false);
  }
  function handleKeyN() {
    console.log(imgName, imgName.at(0));

    if (imgName.at(0) === "B") {
      onCorrect()
    } else {
      onWrong()
    }
    setTimeout(changeToNextImgSource, 2000);
    setCanSelect(false);
  }

  function onCorrect() {
    if (isCorrecct) {
      return
    }
    resetTimer()
    setIsCorrect(true)
    setTimeout(() => { setIsCorrect(false) }, 2000)
  }
  function onWrong() {
    if (isWrong) {
      return
    }
    resetTimer()
    setIsWrong(true)
    setTimeout(() => { setIsWrong(false) }, 2000)
  }

  function resetTimer() {
    if (timer.current) {
      clearInterval(timer.current)
    }
    timer.current = setInterval(() => { changeToNextImgSource() }, 20 * 1000)
  }

  function changeToNextImgSource() {
    let flag = Math.random() > 0.5 ? "A" : "B";
    let num;
    if (flag === "A") {
      num = Math.ceil(Math.random() * 11);
    } else {
      num = Math.ceil(Math.random() * 20);
    }
    setImgName(flag + num);
    setCanSelect(true);
  }



  return (
    <div
      className="App"
    >
      <div className="img-container">
        <img className="source-img" src={src} />
      </div>
      <MessageCorrect trigger={isCorrecct} />
      <MessageWrong trigger={isWrong} />

    </div>

  );
}

export default App;