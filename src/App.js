import logo from './logo.svg';
import './App.css';
import { Form, Input, TextArea, Button, Dropdown} from 'semantic-ui-react';
import Swal from 'sweetalert2';

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
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const message = e.target.elements.user_message.value;
    const selectedOption = e.target.elements.options.value;
    console.log(message, selectedOption);
    Swal.fire({
      icon: 'success',
      title: `Message: ${message} Sent Successfully with Option: ${selectedOption}`
    })
    e.target.reset()
  };

  return (
    <div className='App'>
      <h1>Send Message</h1>
      <Form onSubmit={handleOnSubmit}>
        <Form.Field
          id='form-textarea-control-opinion'
          control={TextArea}
          label='Message'
          name='user_message'
          placeholder='Message…'
          required
        />
          <Dropdown
          placeholder='Select Friend'
          fluid
          selection
          options={hashage}
        />
        <Button type='submit' color='green'>Submit</Button>
      </Form>
    </div>
  );
}

export default App;
