import { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
  const [login, onLogin] = useState(null);

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        return res.json().then((user) => onLogin(user));
      }
    });
  }, []);
  
  return (
    <UserContext.Provider value={{ login, onLogin }}>
      {children}
    </UserContext.Provider>
  );
}


export { UserContext, UserProvider }