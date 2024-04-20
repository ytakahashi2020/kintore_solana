// ①「Expense Tracker」という非同期のテスト開始

let merchantName = "test";
let amount = 100;
let id = 1;

let merchantName2 = "test 2";
let amount2 = 200;

let [expense_account] = anchor.web3.PublicKey.findProgramAddressSync(
  [
    Buffer.from("expense"),
    pg.wallet.publicKey.toBuffer(),
    new BN(id).toArrayLike(Buffer, "le", 8),
  ],
  pg.program.programId
);

// ② テストケース１　「Initialize Expense」（非同期）
await pg.program.methods
  .initializeExpense(new anchor.BN(id), merchantName, new anchor.BN(amount))
  .accounts({
    expenseAccount: expense_account,
    authority: pg.wallet.publicKey,
  })
  .rpc();
// ② テストケース１　「Initialize Expense」（非同期）終了

// ③ テストケース２　「Modify Expense」（非同期）
it("Modify Expense", async () => {
  await pg.program.methods
    .modifyExpense(new anchor.BN(id), merchantName2, new anchor.BN(amount2))
    .accounts({
      expenseAccount: expense_account,
      authority: pg.wallet.publicKey,
    })
    .rpc();
// ③ テストケース２　「Modify Expense」（非同期）　終了

// ④ テストケース３　「Delete Expense」（非同期）
  await pg.program.methods
    .deleteExpense(new anchor.BN(id))
    .accounts({
      expenseAccount: expense_account,
      authority: pg.wallet.publicKey,
    })
    .rpc();
// ④ テストケース３　「Delete Expense」（非同期） 終了

// ①「Expense Tracker」という非同期のテスト終了
