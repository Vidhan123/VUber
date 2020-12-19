import { useState } from 'react';

function useDetails() {
  const [user,setUser] = useState({}); 

  const setData = (data) => {
    localStorage.setItem('myData', JSON.stringify(data))
  };

  const getData = () => {
    let data = localStorage.getItem('myData');
    data = JSON.parse(data);
    setUser(data)
  };

  return [setData, getData, user]
};

export default useDetails;