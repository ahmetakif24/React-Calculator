import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
const math = require("mathjs");

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = useCallback(
    (value) => {
      if (value === "=") {
        try {
          if (input !== undefined) {
            setResult(math.evaluate(input).toString());
          } else {
            setResult("Hata: Giriş değeri bulunamadı.");
          }
        } catch (error) {
          setResult("Hata");
        }
      } else if (value === "C") {
        setInput("");
        setResult("");
      } else if (value === "BackSpace") {
        setInput((prevInput) => prevInput.slice(0, -1));
      } else {
        setInput((prevInput) => prevInput + value);
      }
      setActiveButton(value);
      setTimeout(() => {
        setActiveButton(null);
      }, 1000);
    },
    [input]
  );

  const handleKeyPress = useCallback(
    (event) => {
      const charCode = event.charCode || event.keyCode;
      const char = String.fromCharCode(charCode);

      if ((char === "=" || event.key === "Enter") && input.trim() !== "") {
        // "=" veya Enter tuşuna basıldığında input değerini sıfırla ve sonucu göster

        event.preventDefault();
        setResult(math.evaluate(input).toString());
        setInput("");
        setActiveButton(char === "=" || event.key === "Enter" ? "=" : char);
      } else if (char === "\b" || event.key === "Backspace") {
        // "BackSpace" tuşuna basıldığında ilgili butona "active" sınıfını ekle
        event.preventDefault();
        setInput((prevInput) => prevInput.slice(0, -1));
        setActiveButton("BackSpace");

        // Kontrol noktası 4: Bir süre sonra "active" sınıfını kaldır
        setTimeout(() => {
          setActiveButton(null);
        }, 1000);
      } else if ("1234567890./*-+=C".includes(char)) {
        event.preventDefault();
        handleButtonClick(char);
        setActiveButton(char);
      } else if (event.key === "\b" || event.key === "Delete") {
        event.preventDefault();
        setInput((prevInput) => prevInput.slice(0, -1));
        setActiveButton(null);
      }
    },
    [input, handleButtonClick]
  );

  useEffect(() => {
    // Klavye olaylarını dinle
    document.addEventListener("keypress", handleKeyPress);

    // Komponent kaldırıldığında olay dinleyicisini temizle
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [handleKeyPress, input]);

  useEffect(() => {
    // Her renderda input alanına odaklan
    inputRef.current.focus();
  }, []);

  return (
    <div className="calculator">
      <div className="display">
        <input
          className="number"
          type="text"
          value={input || result} //input ve result değerlerini birleştirerek göster
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress} // onKeyDown olayını burada çağırın
          ref={inputRef}
        />
      </div>
      <div className="buttons">
        <button
          id="btn"
          className={activeButton === "C" ? "active" : ""}
          onClick={() => handleButtonClick("C")}
        >
          C
        </button>

        <button
          id="btn"
          className={activeButton === "BackSpace" ? "active" : ""}
          onClick={() => handleButtonClick("BackSpace")}
        >
          ←
        </button>
        <button
          id="btn"
          className={activeButton === "/" ? "active" : ""}
          onClick={() => handleButtonClick("/")}
        >
          /
        </button>
        <button
          id="btn"
          className={activeButton === "*" ? "active" : ""}
          onClick={() => handleButtonClick("*")}
        >
          X
        </button>
        <button
          id="btn"
          className={activeButton === "7" ? "active" : ""}
          onClick={() => handleButtonClick("7")}
        >
          7
        </button>
        <button
          id="btn"
          className={activeButton === "8" ? "active" : ""}
          onClick={() => handleButtonClick("8")}
        >
          8
        </button>
        <button
          id="btn"
          className={activeButton === "9" ? "active" : ""}
          onClick={() => handleButtonClick("9")}
        >
          9
        </button>
        <button
          id="btn"
          className={activeButton === "-" ? "active" : ""}
          onClick={() => handleButtonClick("-")}
        >
          -
        </button>
        <button
          id="btn"
          className={activeButton === "4" ? "active" : ""}
          onClick={() => handleButtonClick("4")}
        >
          4
        </button>
        <button
          id="btn"
          className={activeButton === "5" ? "active" : ""}
          onClick={() => handleButtonClick("5")}
        >
          5
        </button>
        <button
          id="btn"
          className={activeButton === "6" ? "active" : ""}
          onClick={() => handleButtonClick("6")}
        >
          6
        </button>

        <button
          id="btn"
          className={activeButton === "+" ? "active" : ""}
          onClick={() => handleButtonClick("+")}
        >
          +
        </button>
        <button
          id="btn"
          className={activeButton === "3" ? "active" : ""}
          onClick={() => handleButtonClick("3")}
        >
          3
        </button>
        <button
          id="btn"
          className={activeButton === "2" ? "active" : ""}
          onClick={() => handleButtonClick("2")}
        >
          2
        </button>
        <button
          id="btn"
          className={activeButton === "1" ? "active" : ""}
          onClick={() => handleButtonClick("1")}
        >
          1
        </button>
        <button
          id="btn"
          className={activeButton === "=" ? "active" : ""}
          onClick={() => handleButtonClick("=")}
        >
          =
        </button>
        <button
          id="btn"
          className={activeButton === "0" ? "active" : ""}
          onClick={() => handleButtonClick("0")}
        >
          0
        </button>

        <button
          id="btn"
          className={activeButton === "." ? "active" : ""}
          onClick={() => handleButtonClick(".")}
        >
          .
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
}

export default App;
