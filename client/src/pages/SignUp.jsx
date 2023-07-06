import Link from "next/link";
import Image from 'next/image';
import Header from '../components/Header'

import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from './api/axios';


import { AiFillGoogleCircle } from 'react-icons/ai';
import { FaFacebookSquare, FaGithubSquare } from 'react-icons/fa';

const SignUpPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    // useEffect(() => {
    //     setValidName(USER_REGEX.test(user));
    // }, [user])

    // useEffect(() => {
    //     setValidPwd(PWD_REGEX.test(pwd));
    //     setValidMatch(pwd === matchPwd);
    // }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
     // if button enabled with JS hack
     const v1 = USER_REGEX.test(user);
     const v2 = PWD_REGEX.test(pwd);
     if (!v1 || !v2) {
         setErrMsg("Invalid Entry");
         return;
     }
     try {
         const response = await axios.post(REGISTER_URL,
             JSON.stringify({ user, pwd }),
             {
                 headers: { 'Content-Type': 'application/json' },
                 withCredentials: true
             }
         );
         console.log(response?.data);
         console.log(response?.accessToken);
         console.log(JSON.stringify(response))
         setSuccess(true);
         //clear state and controlled inputs
         //need value attrib on inputs for this
         setUser('');
         setPwd('');
         setMatchPwd('');
     } catch (err) {
         if (!err?.response) {
             setErrMsg('No Server Response');
         } else if (err.response?.status === 409) {
             setErrMsg('Username Taken');
         } else {
             setErrMsg('Registration Failed')
         }
         errRef.current.focus();
     }
 }

  return (
  <div className="bg-gradient-to-r from-[#050816] to-[#100D25]">
    <Header/>
    <section>
      <div className="flex justify-center items-center h-screen gap-10 ">
        <div className="animate-slideRight shadow-card">
          <form  
            onSubmit={handleSubmit}
            className="flex flex-col items-center p-6 border border-gray-300 rounded-lg shadow-lg w-120 h-120 bg-black-100  w-96 h-150"
          >
            <h2 className="text-[24px] font-bold mb-6">Sign Up</h2>
            <input className="rounded-lg border border-gray-300 focus:outline-none focus:border-gray-300 p-3 w-full mb-4 bg-tertiary placeholder:text-secondary" type="text" placeholder="Username" id='username' ref={userRef} autoComplete="off" onChange={(e)=> setUser(e.target.value)} value={user} required aria-invalid={validName ? "false" : "true"} aria-describedby='uidnote' onfocus={()=> setUserFocus(true)} onBlur={() => setUserFocus}/>
              <p id="uidnote" className={userFocus && user && !validName ? "text-xs bg-black text-white rounded-md p-1 relative bottom-10" : "absolute left-[-9999px]"}>
                            <FontAwesomeIcon icon={faInfoCircle} className='mr-1'/>
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
              </p>
            <input className="rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400 p-3 w-full mb-4 bg-tertiary placeholder:text-secondary" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400 p-3 w-full mb-4 bg-tertiary placeholder:text-secondary" type="password" placeholder="Password" id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)} />
               <p id="uidnote" className={userFocus && user && !validName ? "text-xs bg-black text-white rounded-md p-1 relative bottom-10" : "absolute left-[-9999px]"}>
                            <FontAwesomeIcon icon={faInfoCircle} className='mr-1'/>
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
              </p>             
            <input className="rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400 p-3 w-full mb-4 bg-tertiary placeholder:text-secondary" type="password" placeholder="Confirm Password" id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)} />
              <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} className='mr-1'/>
                            Must match the first password input field.
              </p>             
              
            <button
              className="p-3 m-2 rounded-lg border border-gray-300 shadow-md w-32 hover:bg-[#0e9c7d]" 
              type="submit"      
              disabled={!validName || !validPwd || !validMatch ? true : false} 
            >
              
                Sign Up
              </button>
            <h6 className="text-[13px] mb-4">or sign up with</h6>
            <div className="flex justify-between w-full">
              <button className="flex items-center justify-center rounded-lg border-gray-300 bg-red-600 hover:bg-red-700 hover:text-white focus:outline-none focus:border-red-400 p-3 w-full h-10 mr-2" type="button">
                <span className="mr-2"><AiFillGoogleCircle /></span>
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center rounded-lg border-gray-300 bg-blue-600 hover:bg-blue-700 hover:text-white focus:outline-none focus:border-blue-400 p-3 w-full h-10 mr-2" type="button">
                <span className="mr-2"><FaFacebookSquare /></span>
                <span>Facebook</span>
              </button>
              <button className="flex items-center justify-center rounded-lg border-gray-300 bg-gray-700 hover:bg-gray-800 hover:text-white focus:outline-none focus:border-gray-400 p-3 w-full h-10" type="button">
                <span className="mr-2"><FaGithubSquare /></span>
                <span>Github</span>
              </button>
            </div>
          </form>
        </div>
        <div className="hidden md:block ml-8 w-1/2 animate-slideLeft">
          <Image src="/signup.png" alt="Sign Up" width={500} height={800} objectFit="cover" />
        </div>
      </div>
    </section>
  </div>  
  );
};

export default SignUpPage;
