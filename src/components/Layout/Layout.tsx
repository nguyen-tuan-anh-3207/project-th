import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Layout: React.FC<Props> = (props) => {
  return <div className={'container-x'}>{props.children}</div>;
};

export default Layout;
