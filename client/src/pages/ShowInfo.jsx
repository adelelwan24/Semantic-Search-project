import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';



const Home = () => {
    const fetchData = async () => {
        
          
            // Retrieve the token value from the cookie
            
          
            console.log('Login successful:', storedToken);
          }
        try {
            const cookies = parse(document.cookie);
            const Token = cookies.token;
            
            const config = {
            headers: {
              Authorization: `Bearer ${Token}`,

            },
          };
      
          const response = await axios.get('users/info', config);
          setData(response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      

  return (
    <div>
      <h1>Data from Backend API</h1>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default Home;
