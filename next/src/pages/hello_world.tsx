import type { NextPage } from 'next';
import SimpleButton from '@/components/SimpleButton';

const HelloWorld: NextPage = () => {
  const handleOnClick = () => {
    console.log('Clicked!');
  };

  return (
    <>
      <h1>Title</h1>
      <p>content</p>
      {/* <SimpleButton text={'From HelloWorld'} /> */}
      <SimpleButton text={'From HelloWorld'} onClick={handleOnClick} />
    </>
  );
};

export default HelloWorld;
