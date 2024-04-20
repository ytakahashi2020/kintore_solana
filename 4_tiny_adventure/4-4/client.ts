// Client

// The PDA adress everyone will be able to control the character if the interact with your program
const [globalLevel1GameDataAccount] =
// ①PDAの取得(
    /* ②[level1」をバッファとして取得 */
    //[pg.wallet.publicKey.toBuffer()], <- You could also add the player wallet as a seed, then you would have one instance per player. Need to also change the seed in the rust part
    /* ③プログラムIDの取得 */
  );

let txHash;
let gameDateAccount;
try {
  gameDateAccount = await /* ④アカウント情報の取得*/(
    globalLevel1GameDataAccount
  );
} catch {
  // Check if the account is already initialized, other wise initilalize it
  txHash = await /* ⑤メソッドの実行*/
    .initialize()
    .accounts({
      newGameDataAccount: globalLevel1GameDataAccount,
      signer: pg.wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .signers([pg.wallet.keypair])
    .rpc();

  await logTransaction(txHash);
  console.log("A journey begins...");
  console.log("o........");
}

// Here you can play around now, move left and right
txHash = await /* ⑥メソッドの実行*/
  //.moveLeft()
  .moveRight()
  .accounts({
    gameDataAccount: globalLevel1GameDataAccount,
  })
  .signers([pg.wallet.keypair])
  .rpc();
await logTransaction(txHash);

gameDateAccount = await /* ⑦アカウント情報の取得*/ (
  globalLevel1GameDataAccount
);

console.log("Player position is:", gameDateAccount.playerPosition.toString());

switch (gameDateAccount.playerPosition) {
  case 0:
    console.log("A journey begins...");
    console.log("o........");
    break;
  case 1:
    console.log("....o....");
    break;
  case 2:
    console.log("......o..");
    break;
  case 3:
    console.log(".........\\o/");
    break;
}

async function logTransaction(txHash) {
  const { blockhash, lastValidBlockHeight } =
    await pg.connection.getLatestBlockhash();

  await pg.connection.confirmTransaction({
    blockhash,
    lastValidBlockHeight,
    signature: txHash,
  });

  console.log(
    `Solana Explorer: https://explorer.solana.com/tx/${txHash}?cluster=devnet`
  );
}
