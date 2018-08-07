import React from 'react';
import Navigation from './Navigation';

export default ({ children }) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};
