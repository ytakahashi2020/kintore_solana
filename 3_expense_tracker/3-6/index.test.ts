describe("Expense Tracker", async () => {
  // ①「merchantName」という変数に「test」を代入
  // ②「amount」という変数に「100」を代入
  // ③「id」という変数に「1」を代入


  let merchantName2 = "test 2";
  let amount2 = 200;

  /* ④変数expense_accountに取得*/ = /* ⑤PDAを取得する */
    [
      Buffer.from("expense"),
      pg.wallet.publicKey.toBuffer(),
      new BN(id).toArrayLike(Buffer, "le", 8),
    ],
    pg.program.programId
  /* ⑤PDAを取得する 終了*/

  it("Initialize Expense", async () => {
    // ⑥メソッドを使用
      .initializeExpense(new anchor.BN(id), merchantName, new anchor.BN(amount))
      .accounts({
        expenseAccount: expense_account,
        authority: pg.wallet.publicKey,
      })
      // ⑦RPCに送る
  });

  it("Modify Expense", async () => {
    // ⑧メソッドを使用
      .modifyExpense(new anchor.BN(id), merchantName2, new anchor.BN(amount2))
      .accounts({
        expenseAccount: expense_account,
        authority: pg.wallet.publicKey,
      })
      // ⑨RPCに送る
  });

  it("Delete Expense", async () => {
    // ➓メソッドを使用
      .deleteExpense(new anchor.BN(id))
      .accounts({
        expenseAccount: expense_account,
        authority: pg.wallet.publicKey,
      })
      // 11RPCに送る
  });
});
