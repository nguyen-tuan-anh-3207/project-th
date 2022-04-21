import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { routers } from 'src/routes/routers';

const AppRoutes = () => {
  return (
    <Routes>
      {Object.keys(routers).map((key) => {
        //@ts-ignore
        const route = routers[key];
        // fix auth
        // const auth = !!getCookieStorage('access_token');
        return <Route key={key} path={route.path} element={<route.element />} />;
      })}
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  );
};

export default AppRoutes;
