import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import { getCookieStorage } from 'src/helper/utils';

interface Props {
  element: typeof React.Component;
  auth: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PrivateRoute: FC<Props> = ({ element: Component, auth = !!getCookieStorage('access_token'), ...rest }) => {
  return (
    <Route {...rest}>
      <div>123</div>
    </Route>
  );
};

export default PrivateRoute;
