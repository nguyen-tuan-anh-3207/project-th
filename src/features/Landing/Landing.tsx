import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Landing: React.FC<Props> = (props) => {
  return (
    <div>
      <h1>This is the landing page</h1>
      <Link to="sign-in">Click to view our sign-in page</Link>
      <Link to="dashboard">Click to view our dashboard</Link>
    </div>
  );
};

export default Landing;
