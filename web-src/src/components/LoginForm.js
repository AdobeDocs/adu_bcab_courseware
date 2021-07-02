import {TextField} from '@adobe/react-spectrum';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 

function LoginForm() { 
  return ( <> 
    <TextField label="Username" data-testid="username" /> 
    <TextField label="Password" data-testid="password" /> 
  </> ); 
} 
let tree = render(<LoginForm />); 
/*
let username = tree.getByTestId('username'); 
let password = tree.getByTestId('password');
*/

userEvent.click(tree.getByTestId('Username')); 
userEvent.type(document.activeElement, 'devon'); // Tab to the password field, and enter the value. 
userEvent.tab(); 
userEvent.type(document.activeElement, 'Pas$w0rd'); // Tab to the submit button and click it. 
userEvent.tab(); 
userEvent.click(document.activeElement);






