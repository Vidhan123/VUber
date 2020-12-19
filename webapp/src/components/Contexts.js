import React from 'react';

const UserContext = React.createContext({});

const UserProvider = UserContext.Provider;

export { UserProvider, UserContext };