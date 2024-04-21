describe("counter", () => {
  // Configure the client to use the local cluster.

  const systemProgram = anchor.web3.SystemProgram;

  it("Create Counter!", async () => {
    // Keypair = account
    const [counter, _counterBump] =
      await /* ①PDAの取得 */(
        /* ②公開鍵のシード */,
        /* ③プログラムID */
      );
    console.log("Your counter address", counter.toString());
    const tx = await /* ④メソッドの実行 */
      .createCounter()
      .accounts({
        authority: pg.wallet.publicKey,
        counter: counter,
        systemProgram: systemProgram.programId,
      })
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Fetch a counter!", async () => {
    // Keypair = account
    const [counterPubkey, _] = await /* ⑤PDAの取得 */(
      /* ⑥公開鍵のシード */,
      /* ⑦プログラムID */
    );
    console.log("Your counter address", counterPubkey.toString());
    const counter = await pg.program.account.counter.fetch(counterPubkey);
    console.log("Your counter", counter);
  });

  it("Update a counter!", async () => {
    // Keypair = account
    const [counterPubkey, _] = await /* ⑧PDAの取得 */(
      /* ⑨公開鍵のシード */,
      /* 10プログラムID */,
    );
    console.log("Your counter address", counterPubkey.toString());
    const counter = await pg.program.account.counter.fetch(counterPubkey);
    console.log("Your counter", counter);
    const tx = await /* 11メソッドの実行 */
      .updateCounter()
      .accounts({
        counter: counterPubkey,
      })
      .rpc();
    console.log("Your transaction signature", tx);
    const counterUpdated = await pg.program.account.counter.fetch(counterPubkey);
    console.log("Your counter count is: ", counterUpdated.count.toNumber());
  });
});