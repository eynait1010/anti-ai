'use client'
import "./globals.css";
import { useEffect, useMemo, useState } from "react";
import { MessageCorrect } from "./message-correct";
import { MessageWrong } from "./message-wrong";

function App() {
  const [imgName, setImgName] = useState("A1");

  const [canSelect, setCanSelect] = useState(true);
  const [isCorrecct, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

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
    setIsCorrect(true)
    setTimeout(() => { setIsCorrect(false) }, 2000)
  }
  function onWrong() {
    if (isWrong) {
      return
    }
    setIsWrong(true)
    setTimeout(() => { setIsWrong(false) }, 2000)
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