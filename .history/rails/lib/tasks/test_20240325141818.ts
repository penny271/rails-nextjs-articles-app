// https://tinyurl.com/22jxl5m3

// const sleep = (ms: number) => {
//    return new Promise((resolve) => {
//         console.log('hola');
//         setTimeout(resolve, ms)
//     })
// }

// お題1： 3秒後に "hello" とコンソールに出力するプログラムを書いてください
const sleep = (ms) => {
  // throw new Error("Parameter is not a number!");
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

// 3秒待ってから"hello"を出力する非同期関数を定義
const sayHelloAfterDelay = async () => {
  try {
    sleep(3000);
  } catch (e) {
    console.log("エラー発生");
  }

  await sleep(3000);
  console.log("hello");
};

sayHelloAfterDelay();

setTimeout(() => {}, timeout);

/*
お題2: sleep関数内で何かしらの例外を発生するようにしてください。
そしてお題1の関数内でsleepを実行した場合にはその例外は補足され、 "エラー発生" とコンソールに出力されるプログラムを書いてください。
*/
