import logo from './logo.svg';
import './App.css';
import { Form, Input, TextArea, Button, Dropdown, Radio } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import { useState } from 'react';
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");

const hashage = [
  {
    key: '1',
    value : 'MD5',
    text : 'MD5'
  },
  {
    key: '2',
    value : 'SHA256',
    text : 'SHA256'
  },
  {
    key: '3',
    value : 'Keccak-512',
    text : 'Keccak-512'
  },
  {
    key: '4',
    value : 'RipeMD160',
    text : 'RipeMD160'
  },
  {
    key: '5',
    value : 'AES',
    text : 'AES'
  },
  {
    key: '6',
    value : 'RSA',
    text : 'RSA'
  },

];

const App = () => {
  const [inputTypeCrypt, setInputTypeCrypt] = useState("text");
  const [inputTypeDecrypt, setInputTypeDecrypt] = useState("text");
  const [selectedOptionCrypt, setSelectedOptionCrypt] = useState("");
  const [selectedOptionDecrypt, setSelectedOptionDecrypt] = useState("");

  const handleOnSubmitCrypt = (e) => {
    e.preventDefault();
    
    let messageCrypt;
    if (inputTypeCrypt === "text") {
      messageCrypt = e.target.elements.user_message.value;
      if (!messageCrypt) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Le message ne peut pas être vide!'
        });
        return;
      }
    } else {
      messageCrypt = e.target.elements.user_file.files[0];
      if (!messageCrypt) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Veuillez sélectionner un fichier!'
        });
        return;
      }
    }

    let resultCrypt = "none";
    if(selectedOptionCrypt === "AES"){
      resultCrypt = AES.encrypt(messageCrypt, "LA CLE");
    }else if(selectedOptionCrypt === "SHA256"){
      resultCrypt = SHA256(messageCrypt);
    }


    console.log(messageCrypt);
    Swal.fire({
      icon: 'success',
      title: `Message: ${messageCrypt} Sent Successfully with Option: ${selectedOptionCrypt}\n  LA CLE : ${resultCrypt}`
    });
    e.target.reset();
  };

  const handleOptionChangeCrypt = (e, { value }) => setSelectedOptionCrypt(value);
  const handleOptionChangeDecrypt = (e, { value }) => setSelectedOptionDecrypt(value);


  const handleOnSubmitDecrypt = (e) => {
    e.preventDefault();
    
    let messageDecrypt;
    if (inputTypeDecrypt === "text") {
      messageDecrypt = e.target.elements.user_message.value;
      if (!messageDecrypt) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Le message ne peut pas être vide!'
        });
        return;
      }
    } else {
      messageDecrypt = e.target.elements.user_file.files[0];
      if (!messageDecrypt) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Veuillez sélectionner un fichier!'
        });
        return;
      }
    }



    Swal.fire({
      icon: 'success',
      title: `Message: ${messageDecrypt} Sent Successfully with Option: ${selectedOptionDecrypt} \n`
    });
    e.target.reset();
  };

  return (
    <>
    <div className="Crypte1">
      <h1> Application de cryptage </h1>
      <Form onSubmit={handleOnSubmitCrypt}>
        <Form.Field>
          <Radio
            label="Text"
            name="inputType"
            value="text"
            checked={inputTypeCrypt === "text"}
            onChange={(e, { value }) => setInputTypeCrypt(value)}
          />
          <Radio
            label="File"
            name="inputType"
            value="file"
            checked={inputTypeCrypt === "file"}
            onChange={(e, { value }) => setInputTypeCrypt(value)}
          />
        </Form.Field>
        {inputTypeCrypt === "text" ? (
          <Form.Field
            id='form-textarea-control-opinion'
            control={TextArea}
            label='Message'
            name='user_message'
            placeholder='Message…'
            required
          />
        ) : (
          <Form.Field>
            <label>File</label>
            <input type="file" name="user_file" required />
          </Form.Field>
        )}
         <Dropdown
          placeholder='Select Hash Algorithm'
          fluid
          selection
          options={hashage}
          onChange={handleOptionChangeCrypt}
          value={selectedOptionCrypt}
          // value={selectedOptionCrypt}
        />
        <Button id="submit" type="submit" color="green">
          Submit
        </Button>
      </Form>
    </div>

    <div className="Crypte2">
    <h1> Application de décryptage </h1>
    <Form onSubmit={handleOnSubmitDecrypt}>
      <Form.Field>
        <Radio
          label="Text"
          name="inputTypeDecryptage"
          value="text"
          checked={inputTypeDecrypt === "text"}
          onChange={(e, { value }) => setInputTypeDecrypt(value)}
        />
        <Radio
          label="File"
          name="inputType"
          value="file"
          checked={inputTypeDecrypt === "file"}
          onChange={(e, { value }) => setInputTypeDecrypt(value)}
        />
      </Form.Field>
      {inputTypeDecrypt === "text" ? (
        <Form.Field
          id='form-textarea-control-opinion'
          control={TextArea}
          label='Message'
          name='user_message'
          placeholder='Message…'
          required
        />
  ) : (
    <Form.Field>
      <label>File</label>
      <input type="file" name="user_file" required />
    </Form.Field>
  )}
 <Dropdown
          placeholder='Select Hash Algorithm'
          fluid
          selection
          options={hashage}
          onChange={handleOptionChangeDecrypt}
          value={selectedOptionDecrypt}
        />
  <Button id="submit" type="submit" color="green">
    Submit
  </Button>
</Form>
    </div>
</>
  );
};

export default App;


