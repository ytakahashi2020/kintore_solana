describe("Expense Tracker", async () => {
  let merchantName = "test";
  let amount = 100;
  let id = 1;

  let merchantName2 = "test 2";
  let amount2 = 200;

  let [expense_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      ,
      ,
      ,/* ①「expense」をバッファに*/
      /* ②公開鍵をバッファに*/
      /* ③idをバイト配列に*/
    ]
    // ④プログラムID
  );

  it("Initialize Expense", async () => {
    await pg.program.methods
      .initializeExpense(/* ⑤id */, /* ⑥merchantName */, /* ⑦amount */)
      .accounts({
        expenseAccount: expense_account,
        authority: pg.wallet.publicKey,
      })
      .rpc();
  });

  it("Modify Expense", async () => {
    await pg.program.methods
      .modifyExpense(/* ⑧id */, /* ⑨merchantName2 */, /* ➓amount2 */)
      .accounts({
        expenseAccount: expense_account,
        authority: pg.wallet.publicKey,
      })
      .rpc();
  });

  it("Delete Expense", async () => {
    await pg.program.methods
      .deleteExpense(/* 11id */)
      .accounts({
        expenseAccount: expense_account,
        authority: pg.wallet.publicKey,
      })
      .rpc();
  });
});
