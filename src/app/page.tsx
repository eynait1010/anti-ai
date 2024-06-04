'use client'
import "./globals.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCorrect } from "./message-correct";
import { MessageWrong } from "./message-wrong";


function App() {
  const [imgName, setImgName] = useState("A1");

  const [canSelect, setCanSelect] = useState<Boolean>(true);
  const [isCorrecct, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  let beginTimer = useRef<any>(null)
  let changeTimer = useRef<any>(null)


  useEffect(() => {
    beginTimer.current = setTimeout(triggerChangeImg, 15 * 1000)
    return () => {
      clearTimer()
    }
  }, [])

  function clearTimer() {
    if (beginTimer.current) {
      clearTimeout(beginTimer.current)
    }
    if (changeTimer.current) {
      clearInterval(changeTimer.current)
    }
  }

  function triggerChangeImg() {
    clearTimer()
    changeTimer.current = setInterval(changeToNextImgSource, 5 * 1000)
  }

  const src = useMemo(() => `./img/${imgName}.png`, [imgName]);

  useEffect(() => {
    document.addEventListener("keyup", PopupKeyUp, false);
    return () => {
      document.removeEventListener("keyup", PopupKeyUp, false);
    };
  }, [imgName, canSelect, PopupKeyUp]);

  function PopupKeyUp(e: any) {
    if (!canSelect) {
      return;
    }
    if (canSelect === false) {
      return
    }
    setCanSelect(false);
    if (e.code === "KeyY") {
      handleKeyY();
    }
    if (e.code === "KeyN") {
      handleKeyN();
    }
  };
  console.log('>>>', imgName);

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
    clearTimer()
    beginTimer.current = setInterval(triggerChangeImg, 20 * 1000)
  }

  function changeToNextImgSource() {
    let flag = Math.random() > 0.5 ? "A" : "B";
    let num;
    if (flag === "A") {
      num = Math.ceil(Math.random() * 34);
    } else {
      num = Math.ceil(Math.random() * 87);
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