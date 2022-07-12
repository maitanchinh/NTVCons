import React from 'react';
import { AuthContext } from 'core/providers';

const useAuth = () => {
  return React.useContext(AuthContext);
}

export default useAuth;