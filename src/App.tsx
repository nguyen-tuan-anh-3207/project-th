// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import routePath from 'src/constant/routePath';
// import AppRoutes from 'src/routes/AppRoutes';
// import { SocketContext, socketInstance } from 'src/socket/socket2';

// const App: React.FC = () => {
//   // @ts-ignore
//   const isAuth = useSelector((state) => state.auth.isAuth);
//   const navigator = useNavigate();

//   useEffect(() => {
//     if (!isAuth) {
//       navigator(routePath.SIGN_IN);
//     }
//   }, [isAuth]);

//   // const check = async () => {
//   //   console.log('check');
//   //   // @ts-ignore
//   //   const data = await window.navigator.permissions.query({ name: 'microphone' });
//   //   console.log(data);
//   // };
//   //
//   // const get = async () => {
//   //   await window.navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//   // };

//   // useEffect(() => {
//   //   BaseSocket.getInstance().connect();
//   // }, []);

//   return (
//     <SocketContext.Provider value={socketInstance}>
//       <div className={'App'}>
//         <AppRoutes />
//       </div>
//     </SocketContext.Provider>
//   );
// };

import React from 'react';
import CreateQuestions from './features/CreateQuestions';

const App = () => {
  return (
    <div>
      <CreateQuestions />
    </div>
  );
};

export default App;
