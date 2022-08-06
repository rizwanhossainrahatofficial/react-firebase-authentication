import { getAuth, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword,sendEmailVerification, updateCurrentUser ,sendPasswordResetEmail,updateProfile    } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuthetication from './Firebase/firebase.init';


initializeAuthetication();

const googleProvider = new GoogleAuthProvider();

function App() {
  const [name,setName]=useState('')
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [error,setError]=useState('')
const [islogin,setIsLogin]=useState(false)

  const auth = getAuth();
  const handlegooglesignin=()=>{
    signInWithPopup(auth,googleProvider)
    .then(result=>{
      const user=result.user
      console.log(user)
    })
  }

const toggleLogin=e=>{
  setIsLogin(e.target.checked)
}

const handleName=e=>{
  setName(e.target.value)
}

  const handleEmail=e=>{
    setEmail(e.target.value)
  }

  const handlePassword=e=>{
    setPassword(e.target.value)
  }

const handleRegistration=e=>{
  e.preventDefault();
  if(password.length<6){
    setError('passsword should be 6 charecter long')
    return;
  }
  if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
    setError('password must contain 2 upper case')
    return;
  }
  if(islogin){
    processLogin(email,password)
  }
else{
  registerNewUser(email,password)
  
}
}

const processLogin=(email,password)=>{
  signInWithEmailAndPassword (auth,email,password)
  .then(result=>{
    const user=result.user
    console.log(user)
    setError('')
  })
  .catch(error=>{
    setError(error.message)
  })
}

const emailVerify=()=>{
sendEmailVerification(auth.currentUser)
.then(result=>{
  
  console.log(result)
})
}

const registerNewUser=(email,password)=>{
  createUserWithEmailAndPassword(auth,email,password)
  .then(result=>{
    const user=result.user
    console.log(user)
    setError('')
    emailVerify()
    setUserName()
  })
  .catch(error=>{
    setError(error.message)
  })
}

const setUserName=()=>{
  updateProfile(auth.currentUser,{
    displayName:name
  })
  .then(result=>{console.log(result)})
}

const handleResetPassword=()=>{
  sendPasswordResetEmail(auth,email)
  .then(result=>{})
}

  return (
    <div className="mx-5">
      <form onSubmit={handleRegistration}>
        <h3 className='text-primary'>please {islogin ?'login':'register'}</h3>

    { !islogin &&   <div className="row mb-3">
    <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
    <div className="col-sm-10">
      <input onBlur={handleName} type="name" className="form-control" id="inputName" placeholder="your name"/>
    </div>
  </div>}

  <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input onBlur={handleEmail} type="email" className="form-control" id="inputEmail3"/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input onBlur={handlePassword} type="password" className="form-control" id="inputPassword3"/>
    </div>
  </div>
 
  <div className="row mb-3">
    <div className="col-sm-10 offset-sm-2">
      <div className="form-check">
        <input onChange={toggleLogin} className="form-check-input" type="checkbox" id="gridCheck1"/>
        <label className="form-check-label" htmlFor="gridCheck1">
          Already registered?
        </label>
      </div>
    </div>
  </div>
  <div className="row mb-3 text-danger">{error}</div>
  <button type="submit" className="btn btn-primary">
   {islogin ? 'login':'Register'}
  </button>
  <button onClick={handleResetPassword} type="button" className="btn btn-secondary btn-sm">Reset Password</button>

</form>

      <br /><br /><br />
      <div>......................</div>
    <button onClick={handlegooglesignin}>Google sign in</button>
    </div>
  );
}

export default App;
