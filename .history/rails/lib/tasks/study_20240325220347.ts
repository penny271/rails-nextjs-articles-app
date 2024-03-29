//

// resolve は、Promise のコンテキスト内で使用される関数で、Promise を成功状態に移行させ、その成功時の値を設定します。
// Promise は非同期操作の最終結果を表すオブジェクトで、3つの状態のいずれかを持ちます：pending（保留中）、fulfilled（成功）、または rejected（失敗）。
function fetchData(): Promise<number> {
  return new Promise((resolve) => {
      setTimeout(()=> {
          // return 999;  <= 意味がない returnされない
          resolve(999);   // <= resolve（x）の引数が returnされる
      },2000)
  })
}

// .then() の中で行うのは、単に値を返す（これにより新しい Promise がその値で fulfilled になる）か、
// あるいは新しい Promise を返すことです（例えば、さらに別の非同期処理を開始する場合）。どちらの場合も、.then() メソッドは
// コールバック関数の結果に基づいて新しい Promise を生成し、それを返します。
function processData(): Promise<number> {
  return fetchData().then((data: number) => {
      return data * 2;  // データ加工の例
  });
}

// thenを使った場合
processData().then((result: number) => {
  console.log('thenを使った場合:', result);
})

// async内でないと awaitは使えない
async function displayResult() {
  const processDataResult = await processData();
  console.log('awaitを使った場合:',processDataResult);
}

displayResult();

// --------------------------------------cut---

// インデックスシグネチャ { [key: number]: string } を定義することで、
// userが任意の数値をキーとして使用でき、文字列を返すオブジェクトであることをTypeScriptに伝えていることになる。
const user: { [key: number]: string } = {
  1: '太郎',
  2: '次郎',
}

function fetchUserData(userId: number): Promise<string | undefined> {
  // throw new Error('error発生 js');
  // eee
  return new Promise((resolve) => {
      resolve(user[userId]);
  })
}

async function getUserData(userId: number) {
  try{
      // ここを完成させてください
      const result = await fetchUserData(userId)
      console.log('result: ', result);
  } catch(err: any) {
      console.log('error発生: ', err.message)
  }
}

getUserData(1);