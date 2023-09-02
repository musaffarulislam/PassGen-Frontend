import { useState, useEffect } from "react";
import Image from "../assets/passGen.png";
import Modal from "../components/Modal/Modal";
import { InputNumber, Slider, Switch, message } from "antd";
import { savePasswordApi ,fetchSavedPassword } from "../services/api/userApi";
import Icon from '../assets/icon.jpg'
import Card from "../components/Card/Card";
import { useNavigate } from "react-router-dom";
import Swal, { SweetAlertResult } from "sweetalert2";



const numbers = "0123456789";
const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
const specialCharacters = "!@#$%^&*-_=~`|/:;,.";

function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate()

  const [password, setPassword] = useState<string>("");
  const [appName, setAppName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [passwordLength, setPasswordLength] = useState<number>(4);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(false);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(false);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);

  const [generatedPassword, setGeneratedPassword] = useState<string>("");
  const [allOptionsSelected, setAllOptionsSelected] = useState<boolean>(false);
  const [passwordGenerated, setPasswordGenerated] = useState<boolean>(false);

  const [savedPasswordData, setSavedPasswordData] = useState<string[]>([]);

  const openModal = () => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
      Swal.fire({
        icon: 'error',
        title: 'Login Required',
        text: 'Please log in first!',
        confirmButtonText: 'Go to Login',
        cancelButtonText: 'Cancel', 
        showCancelButton: true,     
        showCloseButton: true,
      }).then((result:SweetAlertResult) => {
        if (result.isConfirmed) {
      navigate('/login')
        }
      });
    } else {
      setModalOpen(true);
    }
    
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchPassword = async () => {
      try {
        const userToken = localStorage.getItem('UserToken');
        if (userToken) {
          const headers = {
            Authorization: JSON.parse(userToken)?.token,
          };
        const response =  await fetchSavedPassword(headers)
        if(response && response.data){
          setSavedPasswordData(response.data);
        }else{
          message.error("Network error");
        }
        }
      } catch (err:any) {
        message.error(err.response.data.error)
      }
    };
    fetchPassword();
  }, []);
  

  useEffect(() => {
    if (
      includeUppercase &&
      includeLowercase &&
      includeNumbers &&
      includeSymbols
    ) {
      setAllOptionsSelected(true);
    } else {
      setAllOptionsSelected(false);
    }
  }, [includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

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
    const generatedPassword = createRandomPassword(characterList);
    setPassword(generatedPassword);
    setGeneratedPassword(password);
    setPasswordGenerated(true);
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
      message.success("Successfully copied");
    }
  };

  const handleSavePassword = async () => {
    if (
      allOptionsSelected &&
      passwordGenerated &&
      appName.trim() !== "" &&
      userName.trim() !== ""
    ) {
      const savedData = {
        appName: appName,
        userName: userName,
        password: password,
      };
      try {
        const userToken = localStorage.getItem('UserToken');
        if (userToken) {
          const headers = {
            Authorization: JSON.parse(userToken).token,
          };
  
          const response = await savePasswordApi(savedData, headers); 
          
          if (response && response.data) {
            message.success("Password Created successfully.");
            closeModal()
          } else {
            message.error("Network error");
          }
        } else {
          message.error("User token not found in localStorage.");
        }
      } catch (err:any) {
        message.error(err.response.data.error)
      }
    } else {
      message.info(
        "Please enable all options and provide App Name and User Name."
      );
    }
  };

  const handleCopy = (password:string) => {
    navigator.clipboard.writeText(password);
    message.success("Successfully copied");
  };

  const handleDelete = () => {
    // Logic for deleting
  };


  const onPasswordLengthChange = (value: number | null | undefined) => {
    if (value !== null && value !== undefined) {
      setPasswordLength(value);
    }
  };
 

  return (
    <div className="mb-16">
      <div className="flex flex-col md:flex-row ">
        <div className="flex-1  md:w-1/2">
          <img src={Image} alt="Image" className="h-full w-full object-cover" />
        </div>
        <div className="flex-1  p-10 flex flex-col justify-center items-center md:items-start md:w-1/2">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-4xl font-semibold font-serif mb-4">
              PassGen-X: Crafting Super Strong Passwords Just For You
            </h1>
            <p className="text-gray-600">
              Generate strong and secure passwords to protect your online
              accounts. Customize your password criteria and ensure your data's
              safety.
            </p>
          </div>
          <div className="mb-4 md:mb-0 space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition w-full md:w-auto"
              onClick={openModal}
            >
              Generate Password
            </button>
            {/* <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition w-full md:w-auto">
              Add Password
            </button> */}
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={closeModal}>
        <div className="space-y-5">
          <h1 className="text-2xl font-bold">Add Password</h1>
          <div className="fixed left-1/2 top-1/2 w-80 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white p-5 sm:w-96">
            <div className="space-y-5 bg-white ">
              <h1 className="text-2xl font-bold">Add Password</h1>
              <div className="flex justify-between">
                <input
                  className="w-full rounded-md"
                  type="text"
                  readOnly
                  value={generatedPassword}
                />
              </div>
              <div className="flex gap-3">
                <button
                  className="uppercase w-1/2 rounded-md border border-indigo-900 bg-white px-2 py-2 text-sm font-semibold text-indigo-900 sm:px-3 sm:text-base"
                  onClick={handleCopyClick}
                >
                  Copy Password
                </button>
                <button
                  className="w-1/2 rounded-md bg-indigo-500 px-2 py-2 text-sm font-semibold text-white active:bg-indigo-900 sm:px-3 sm:text-base"
                  onClick={handleGeneratePassword}
                >
                  Generate New
                </button>
              </div>
              <div>
                <label
                  htmlFor="appName"
                  className="text-sm font-medium text-gray-700"
                >
                  App Name
                </label>
                <input
                  className="w-full rounded-md border-2 border-gray-300 p-2"
                  type="text"
                  id="appName"
                  placeholder="App Name"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="userName"
                  className="text-sm font-medium text-gray-700"
                >
                  User Name
                </label>
                <input
                  className="w-full rounded-md border-2 border-gray-300 p-2"
                  type="text"
                  id="userName"
                  placeholder="User Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="length" className="font-semibold">
                    Password length
                  </label>
                </div>
                <div className="flex items-center">
                  <Slider
                    id="length-slider"
                    min={4}
                    max={20}
                    value={passwordLength}
                    onChange={onPasswordLengthChange}
                    className="w-32 mr-4"
                  />
                  <InputNumber
                    id="length-input"
                    min={4}
                    max={20}
                    value={passwordLength}
                    onChange={onPasswordLengthChange}
                    className="w-12 h-8"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="uppercase" className="font-semibold">
                    Include uppercase letters
                  </label>
                </div>
                <div>
                  <Switch
                    id="uppercase-switch"
                    className="bg-gray-500"
                    checked={includeUppercase}
                    onChange={(checked) => setIncludeUppercase(checked)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="lowercase" className="font-semibold">
                    Include lowercase letters
                  </label>
                </div>
                <div>
                  <Switch
                    id="lowercase-switch"
                    className="bg-gray-500"
                    checked={includeLowercase}
                    onChange={(checked) => setIncludeLowercase(checked)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="number" className="font-semibold">
                    Include numbers
                  </label>
                </div>
                <div>
                  <Switch
                    id="number-switch"
                    className="bg-gray-500"
                    checked={includeNumbers}
                    onChange={(checked) => setIncludeNumbers(checked)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="symbol" className="font-semibold">
                    Include symbols
                  </label>
                </div>
                <div>
                  <Switch
                    id="symbol-switch"
                    className="bg-gray-500"
                    checked={includeSymbols}
                    onChange={(checked) => setIncludeSymbols(checked)}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  className="uppercase w-1/2 rounded-md border border-indigo-900 bg-white px-2 py-2 text-sm font-semibold text-indigo-900 sm:px-3 sm:text-base"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  disabled={!allOptionsSelected || !passwordGenerated}
                  className={`w-1/2 ${
                    allOptionsSelected && passwordGenerated
                      ? "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-900 text-white"
                      : "bg-gray-400 cursor-not-allowed"
                  } rounded-md px-2 py-2 text-sm font-semibold sm:px-3 sm:text-base`}
                  onClick={() => handleSavePassword()}
                >
                  Save Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

  
      {/* <div className="flex flex-col items-center space-y-4">
      {listItems.map((item, index) => (
        <List  key={index} title={item.title} />
      ))}
    </div> */}
   

    <h1 className="text-4xl font-semibold mb-4 ml-10 font-serif ">Saved Password</h1>
    <div>
      <div className="flex flex-wrap">
        {savedPasswordData.map((data: any, index: number) => (
          <Card
            key={index}
            image={<img src={Icon} alt="Card Image" className="rounded-full h-16 w-16" />}
            head={data.appName}
            title={`UserName: ${data.userName}`}
            onCopy={() => handleCopy(data.password)}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
    </div>
  );
}

export default Hero;
