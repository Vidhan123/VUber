import { useState } from 'react';
import axios from 'axios';

function useValidation() {
  let initialErrs = { fname: false, lname: false, email: false, num: false, password: false, address: false };
  const [err,setErr] = useState(initialErrs);

  const validate = async (vals,setWarn) => {
    const { firstName, lastName, email, mobileNo, password, address, role } = vals;

    const nameCheck = /^[a-zA-Z ]+$/;
    const emailCheck = /^([a-zA-Z0-9._-]+)@([a-zA-Z0-9.-]+).([a-zA-Z]+)(.[a-zA-Z]{2,8})?$/;
    const numberCheck = /^\+?([0-9 ]{3})?([0-9- .]{10,13})$/;

    let fn, ln, e, no, p, ad;
    if (firstName.trim() === "" || !nameCheck.test(firstName)) {
      fn = true;
    } else fn = false ;
    if (lastName.trim() === "" || !nameCheck.test(lastName)) {
      ln = true;
    } else ln = false ;
    if (!emailCheck.test(email)) {
      e = true;
    } else e = false ;
    if (!numberCheck.test(mobileNo)) {
      no = true;
    } else no = false;
    if (password.length < 6) {
      p = true;
    } else p = false;
    if (address.trim() === "") {
      ad = true;
    } else ad = false ;
    
    setErr({ fname:fn, lname:ln, email:e, num:no, password:p, address:ad })

    if (fn + ln + e + no + p + ad === 0) {
      axios.post('http://localhost:9000/register', {
        firstName,
        lastName, 
        email, 
        mobileNo, 
        password, 
        address, 
        role
      })
      .then((res) => setWarn(res.data.msg))
      .catch((err) => console.log(err));
    } 
  };

  return [err,validate]
}

export default useValidation;