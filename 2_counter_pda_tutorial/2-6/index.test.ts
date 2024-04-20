describe("counter", () => {
  // Configure the client to use the local cluster.

  const systemProgram = anchor.web3.SystemProgram;

  it("Create Counter!", async () => {
    // Keypair = account
    const [counter, _counterBump] =
      await anchor.web3.PublicKey.findProgramAddressSync(
        [pg.wallet.publicKey.toBytes()],
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
      await anchor.web3.PublicKey.findProgramAddressSync(
        [pg.wallet.publicKey.toBytes()],
        pg.program.programId
      );
    console.log("Your counter address", counterPubkey.toString());
    const counter = await /* ⑤カウンターの取得 */(/* ⑥引数 */);
    console.log("Your counter", counter);
  });

  it("Update a counter!", async () => {
    // Keypair = account
    const [counterPubkey, _] =
      await anchor.web3.PublicKey.findProgramAddressSync(
        [pg.wallet.publicKey.toBytes()],
        pg.program.programId
      );
    console.log("Your counter address", counterPubkey.toString());
    const counter = await /* ⑦カウンターの取得 */(/* ⑧引数 */);
    console.log("Your counter", counter);
    const tx = await pg.program.methods
      .updateCounter()
      ./* ⑨アカウント */({
        counter: counterPubkey,
      })
      ./* 10 RPC */;
    console.log("Your transaction signature", tx);
    const counterUpdated = await /* 11カウンターの取得 */(/* 12引数 */);
    console.log("Your counter count is: ", counterUpdated.count./* 13数字に */);
  });
});
