describe("counter", () => {
  // Configure the client to use the local cluster.

  const systemProgram = anchor.web3.SystemProgram;

  it("Create Counter!", async () => {
    // Keypair = account
    const [counter, _counterBump] =
      await /* 復習（PDAの取得） */(
        /* 復習（署名者の公開鍵のシード） */,
        pg.program.programId
      );
    console.log("Your counter address", counter.toString());
    const tx = await pg.program.methods
      .createCounter()
      ./* ①アカウント */({
        authority: /* ②権限ある者 */,
        counter: counter,
        systemProgram: /* ③システムプログラム */,
      })
      ./* ④RPC */ ;
    console.log("Your transaction signature", tx);
  });

  it("Fetch a counter!", async () => {
    // Keypair = account
    const [counterPubkey, _] =
      await /* 復習（PDAの取得） */(
        /* 復習（署名者の公開鍵のシード） */,
        pg.program.programId
      );
    console.log("Your counter address", counterPubkey.toString());
    const counter = await /* ⑤カウンターの取得 */(/* ⑥引数 */);
    console.log("Your counter count is ", counter./* ⑦counterの数字 */);
  });

  it("Update a counter!", async () => {
    // Keypair = account
    const [counterPubkey, _] =
      await anchor./* 復習（PDAの取得） */(
        /* 復習（署名者の公開鍵のシード） */,
        pg.program.programId
      );
    console.log("Your counter address", counterPubkey.toString());
    const counter = await /* ⑧カウンターの取得 */(/* ⑨引数 */);
    console.log("Your counter count is ", counter./* 10counterの数字 */);
    const tx = await pg.program.methods
      .updateCounter()
      ./* 11アカウント */({
        counter: counterPubkey,
      })
      ./* 12 RPC */;
    console.log("Your transaction signature", tx);
    const counterUpdated = await /* 13カウンターの取得 */(/* 14引数 */);
    console.log("Your counter count is: ", counterUpdated./* 15counterの数字 */);
  });
});
