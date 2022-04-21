import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'src/components/base/Button';
import routePath from 'src/constant/routePath';
import { setAuth } from 'src/features/SignIn/redux/auth';
import { signInPost } from 'src/features/SignIn/services';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SignIn: React.FC<Props> = (props) => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserName(value);
  };
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const signIn = async () => {
    if (userName && password) {
      try {
        const res = await signInPost(userName, password);
        dispatch(setAuth({ userName: res.data.userName, role: res.data.role }));
        navigate(routePath.DASHBOARD);
      } catch (e) {
        alert(e);
      }
    } else {
      alert('Missing User name or Password');
    }
  };

  return (
    <>
      <div className={'flex flex-col items-center mt-10'}>
        <div className={'text-5xl font-bold uppercase tracking-widest'}>Sign In</div>

        <div className={'mt-5 text-[#777777]'}>Enter your email to log into your account.</div>
        <div className={'flex flex-col mt-12'}>
          <div>
            <div className={''}>User Name</div>
            <input
              value={userName}
              onChange={onUserNameChange}
              className={'min-w-[23rem] h-[3.25rem] rounded-[12px] border border-[2px] border-[#C7C7C7] mt-2 px-4 py-2'}
              type={'text'}
            />
            <div className={'mt-8'}>Password</div>
            <input
              value={password}
              onChange={onPasswordChange}
              className={'min-w-[23rem] h-[3.25rem] rounded-[12px] border border-[2px] border-[#C7C7C7] mt-2 px-4 py-2'}
              type={'password'}
            />
          </div>
          <div className={'flex justify-end'}>
            <Button
              content={'Sign In'}
              handleClick={signIn}
              size={'sm'}
              classNamePrefix={'rounded-[12px] bg-[#411CFF] mt-8 rounded-full hover:bg-[#4f46e5] text-[white]'}
            />
          </div>

          <div
            className={'mt-5 text-[#777777] cursor-pointer hover:text-[#2563eb] hover:underline'}
            onClick={() => {
              navigate(routePath.SIGN_UP);
            }}
          >
            Create new account
          </div>
        </div>
      </div>
    </>
  );
};
export default SignIn;
