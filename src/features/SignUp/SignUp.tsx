import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'src/components/base/Button';
import routePath from 'src/constant/routePath';
import { signUpPost } from 'src/features/SignIn/services';
import { Role } from 'src/interfaces/role';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SignUp: React.FC<Props> = (props) => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<Role>(Role.STUDENT);

  const navigate = useNavigate();

  const onUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserName(value);
  };
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const signUp = async () => {
    if (userName && password) {
      await signUpPost(userName, password, role);
      navigate(routePath.SIGN_IN);
    } else {
      alert('missing userName or password');
    }
  };

  return (
    <>
      <div className={'flex flex-col items-center mt-10'}>
        <div className={'text-5xl font-bold uppercase tracking-widest'}>Sign Up</div>

        {/*<div className={'mt-5 text-[#777777]'}>Enter your email to log into your account.</div>*/}
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

          <div className={'flex justify-evenly mt-8'}>
            <Button
              content={'Student'}
              classNamePrefix={
                role === Role.STUDENT
                  ? ''
                  : 'text-[black] border border-[1px] border-[black] bg-[white] hover:text-white rounded-full hover:bg-[#4f46e5]'
              }
              size={'sm'}
              handleClick={() => {
                setRole(Role.STUDENT);
              }}
            />
            <Button
              content={'Teacher'}
              classNamePrefix={
                role === Role.TEACHER
                  ? ''
                  : 'text-[black] border border-[1px] border-[black] bg-[white] hover:text-white rounded-full hover:bg-[#4f46e5]'
              }
              size={'sm'}
              handleClick={() => {
                setRole(Role.TEACHER);
              }}
            />
          </div>
          <div className={'flex justify-end'}>
            <Button
              content={'Sign Up'}
              handleClick={signUp}
              size={'sm'}
              classNamePrefix={'rounded-[12px] bg-[#411CFF] mt-8 rounded-full hover:bg-[#4f46e5] text-[white]'}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
