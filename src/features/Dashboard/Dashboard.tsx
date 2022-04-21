import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'src/components/base/Button';
import routePath from 'src/constant/routePath';
import { clearAuth } from 'src/features/SignIn/redux/auth';
import { Role } from 'src/interfaces/role';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Dashboard: React.FC<Props> = (props) => {
  // @ts-ignore
  const role = useSelector((state) => state.auth.role);

  const dispatch = useDispatch();
  const navigator = useNavigate();

  const logOut = () => {
    dispatch(clearAuth());
  };

  return (
    <>
      <div className={'flex justify-end'}>
        <Button content={'Log out'} size={'sm'} handleClick={logOut} />
      </div>
      <div>
        <div className={'flex justify-center'}>
          {role === Role.TEACHER && (
            <div className={'mr-8'}>
              <Button
                content={'Create Room'}
                size={'sm'}
                handleClick={() => {
                  navigator(routePath.TEACHER);
                }}
              />
            </div>
          )}
          <div className={'mr-8'}>
            <Button
              content={'Join Room'}
              size={'sm'}
              handleClick={() => {
                navigator(routePath.STUDENT);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
