import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  content: string;
  // use for overwriting attribute
  classNamePrefix?: string;
  size?: 'sm' | 'md' | 'lg';
  maxWidth?: boolean;
  handleClick?: () => void;
}

const Button: React.FC<Props> = ({ content, classNamePrefix, size = 'md', maxWidth, handleClick }) => {
  // TODO: config color
  const defaultClass = 'rounded-full text-white bg-[#4338ca] hover:bg-[#4f46e5] active:bg-[#312e81]';

  // eslint-disable-next-line no-shadow
  const getSize = (size?: 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'sm':
        return 'px-6 py-2';
      case 'md':
        return 'px-10 py-4';
      case 'lg':
        return 'px-14 py-6';
      default:
        return 'px-6 py-4';
    }
  };

  const combineClassName = () => {
    const sizeString = ' ' + getSize(size);
    const maxWidthString = maxWidth ? ' ' + 'w-full' : '';
    const classNameString = classNamePrefix ? classNamePrefix + ' ' : defaultClass;

    return classNameString + sizeString + maxWidthString;
  };

  return (
    <>
      <button className={combineClassName()} onClick={handleClick}>
        {content}
      </button>
    </>
  );
};

export default Button;
