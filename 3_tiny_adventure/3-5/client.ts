// Client

// The PDA adress everyone will be able to control the character if the interact with your program
const [globalLevel1GameDataAccount] =
  anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("level1", "utf8")],
    //[pg.wallet.publicKey.toBuffer()], <- You could also add the player wallet as a seed, then you would have one instance per player. Need to also change the seed in the rust part
    pg.program.programId
  );

let txHash;
let gameDateAccount;
try {
  gameDateAccount = await pg.program.account.gameDataAccount.fetch(
    globalLevel1GameDataAccount
  );
} catch {
  // Check if the account is already initialized, other wise initilalize it
  txHash = await pg.program.methods
    ./* ①initialize関数の実行 */
    ./* ②アカウント */({
      /*③引数1 */ : globalLevel1GameDataAccount,
      /*④引数2 */ : pg.wallet.publicKey,
      /*⑤引数3 */ : web3.SystemProgram.programId,
    })
    ./*⑥署名者 */ ([pg.wallet.keypair])
    ./*⑦RPC */ ;

  await logTransaction(txHash);
  console.log("A journey begins...");
  console.log("o........");
}


// アドレスの表示
console.log("PGのアドレス：", pg.wallet.publicKey);
console.log("systemProgramのアドレス：", web3.SystemProgram.length);

// キーペアの表示
// console.log("key Pair", pg.wallet.keypair);

// カーブ上か否か
console.log(
  "カーブ上か否か：",
  anchor.web3.PublicKey.(globalLevel1GameDataAccount)
);

// Here you can play around now, move left and right
txHash = await pg.program.methods
  //.moveLeft()
  ./* ⑧moveRight関数の実行 */
  ./* ⑨アカウント */({
    /*10引数1 */: globalLevel1GameDataAccount,
  })
  ./*11署名者 */([pg.wallet.keypair])
  ./*12実行 */;
await logTransaction(txHash);

gameDateAccount = await pg.program.account.gameDataAccount.fetch(
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
