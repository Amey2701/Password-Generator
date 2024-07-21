import { useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from "validator";

export default function PasswordGenerator() {
  const lengthRef = useRef();
  const [length, setLength] = useState('');
  const [uppercase, setUppercase] = useState(false);
  const [digits, setDigits] = useState(false);
  const [special, setSpecial] = useState(false);
  const [password, setPassword] = useState("");

  const handleLengthChange = (event) => {
    setLength(event.target.value);
  };

  const handleUppercaseChange = (event) => {
    setUppercase(event.target.checked);
  };

  const handleDigitsChange = (event) => {
    setDigits(event.target.checked);
  };

  const handleSpecialChange = (event) => {
    setSpecial(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (length === '') {
      alert("You did not enter the length of the password");
      lengthRef.current.focus();
      return;
    }

    const btnName = event.nativeEvent.submitter.name;

    if (btnName === "sub") {
      let text = "abcdefghijklmnopqrstuvwxyz";
      if (uppercase) text += text.toUpperCase();
      if (digits) text += "0123456789";
      if (special) text += "!@#$%^&*()";

      let pw = '';
      const len = parseInt(length);
      for (let i = 1; i <= len; i++) {
        const r = Math.floor(Math.random() * text.length);
        pw += text[r];
      }
      setPassword(pw);
    } else if (btnName === "ctc") {
      if (password !== '') {
        navigator.clipboard.writeText(password);
        toast.success("Copied to clipboard", {
          autoClose: 1000,
          position: "top-center",
          theme: "dark"
        });
      }
    } else if (btnName === "ps") {
      const sp = { minLength: 8, minLowerCase: 1, minUpperCase: 1, minNumbers: 1, minSymbols: 2 };
      if (validator.isStrongPassword(password, sp)) {
        toast.success("Strong password");
      } else {
        toast.warning("Weak password");
      }
    } else if (btnName === "clr") {
      // Clear form and password
      setLength('');
      setUppercase(false);
      setDigits(false);
      setSpecial(false);
      setPassword('');
      lengthRef.current.focus();
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="center">
        <h1>Password Generator</h1>
        <form onSubmit={handleSubmit}>
          <label>Enter Password Length</label>
          <input
            type="number"
            min="8"
            max="20"
            onChange={handleLengthChange}
            ref={lengthRef}
            value={length}
          />
          <br /><br />
          <label>
            <input
              type="checkbox"
              onChange={handleUppercaseChange}
            /> Uppercase
          </label>
          <label>
            <input
              type="checkbox"
              onChange={handleDigitsChange}
            /> Digits
          </label>
          <label>
            <input
              type="checkbox"
              onChange={handleSpecialChange}
            /> Special Characters
          </label>
          <br /><br />
          <input type="submit" name="sub" value="Generate Password" className="btn" />
          <input type="submit" value="Copy to Clipboard" name="ctc" className="btn" />
          <input type="submit" value="Password Strength" name="ps" className="btn" />
          <input type="submit" value="Clear" name="clr" className="btn clear" />
        </form>
        <h2>{password}</h2>
      </div>
    </>
  );
}
