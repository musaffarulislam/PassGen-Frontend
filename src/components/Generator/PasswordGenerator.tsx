import React, { useState } from "react";
import {message} from 'antd'

interface PasswordGeneratorProps {
  onClose: () => void;
}

const PasswordGenerator: React.FC<PasswordGeneratorProps> = ({ onClose }) => {
  const [password, setPassword] = useState<string>("");
  const [passwordLength, setPasswordLength] = useState<number>(4);
  const [includeUppercase, setIncludeUpperCase] = useState<boolean>(false);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(false);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);

  const numbers = "0123456789";
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const specialCharacters = "!@#$%^&*-_=~`|/:;,.";

  const handleGeneratePassword = () => {
    let characterList = "";
    if (includeUppercase) {
      characterList += upperCaseLetters;
    }

    if (includeLowercase) {
      characterList += lowerCaseLetters;
    }

    if (includeNumbers) {
      characterList += numbers;
    }

    if (includeSymbols) {
      characterList += specialCharacters;
    }
    setPassword(createRandomPassword(characterList));
  };

  function createRandomPassword(characterList: string): string {
    let password = "";
    const characterListLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characterListLength);
      password += characterList.charAt(randomIndex);
    }
    return password;
  }

  const handleCopyClick = () => {
    if (password.length > 0) {
      navigator.clipboard.writeText(password);
        message.success("Password copied to clipboard");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Password Generator</h1>
      <div>
        <input
          className="w-full rounded-md"
          type="text"
          readOnly
          value={password}
        />
      </div>
      <div>
        <button
          onClick={handleGeneratePassword}
          className="w-full px-3 py-2 text-white bg-indigo-500 font-semibold active:bg-indigo-900 rounded-md text-sm sm:text-base"
        >
          Generate New Password
        </button>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <label htmlFor="length" className="font-semibold">
            Password length
          </label>
        </div>
        <div>
          <input
            id="length"
            className="w-16 h-6"
            value={passwordLength}
            min={4}
            max={20}
            type="number"
            onChange={(e) => {
              setPasswordLength(Number(e.target.value));
            }}
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <label htmlFor="uppercase" className="font-semibold">
            Include uppercase letters
          </label>
        </div>
        <div>
          <input
            id="uppercase"
            className="w-5 h-5"
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => {
              setIncludeUpperCase(e.target.checked);
            }}
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <label htmlFor="lowercase" className="font-semibold">
            Include lowercase letters
          </label>
        </div>
        <div>
          <input
            id="lowercase"
            className="w-5 h-5"
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => {
              setIncludeLowercase(e.target.checked);
            }}
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <label htmlFor="number" className="font-semibold">
            Include numbers
          </label>
        </div>
        <div>
          <input
            id="number"
            className="w-5 h-5"
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => {
              setIncludeNumbers(e.target.checked);
            }}
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <label htmlFor="symbol" className="font-semibold">
            Include symbols
          </label>
        </div>
        <div>
          <input
            id="symbol"
            className="w-5 h-5"
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => {
              setIncludeSymbols(e.target.checked);
            }}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="w-1/2 px-2 sm:px-3 py-2 rounded-md text-indigo-900 bg-white font-semibold uppercase border border-indigo-900 text-sm sm:text-base"
        >
          Cancel
        </button>
        <button
          onClick={handleCopyClick}
          className="w-1/2 px-2 sm:px-3 py-2 rounded-md text-white bg-indigo-500 font-semibold active:bg-indigo-900 text-sm sm:text-base"
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
