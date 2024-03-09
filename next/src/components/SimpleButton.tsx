// next/src/components/SimpleButton.tsx
import React from 'react';

type SimpleButtonProps = {
  text: string;
  onClick: () => void;
};

// In React, when you see something like React.FC<Props>, it means that the component expects props of type Props. By using generics in this way, you can create more flexible and reusable components that maintain type safety throughout your application.
const SimpleButton: React.FC<SimpleButtonProps> = (props) => {
  console.log('props :>> ', props);
  // props :>>  {text: 'From HelloWorld'}

  // return <button onClick={handleOnClick('props.text')}>{props.text}</button>;
  return <button onClick={props.onClick}>{props.text}</button>;
};

export default SimpleButton;
