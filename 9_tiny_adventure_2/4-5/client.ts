// The PDA adress everyone will be able to control the character if the interact with your program
const [globalLevel1GameDataAccount, bump] =
  await /* ①PDAの取得 */(
    /* ②level1というバッファ */,
    //[pg.wallet.publicKey.toBuffer()], <- You could also add the player wallet as a seed, then you would have one instance per player. Need to also change the seed in the rust part
     /* ③プログラムID */
  );

// This is where the program will save the sol reward for the chests and from which the reward will be payed out again
const [chestVaultAccount, chestBump] =
  await /* ④PDAの取得 */(
    /* ⑤chestVaultというバッファ */,
    /* ⑥プログラムID */
  );

// Initialize level set the player position back to 0 and the caller needs to pay to fill up the chest with sol
let txHash = await /* ⑦メソッドの実行 */
  ./* ⑧initializeLevelOneの実行 */
  ./* ⑨なんでしょう */({
    chestVault: chestVaultAccount,
    newGameDataAccount: globalLevel1GameDataAccount,
    signer: pg.wallet.publicKey,
    systemProgram: web3.SystemProgram.programId,
  })
  ./* 10なんでしょう */([pg.wallet.keypair])
  ./* 11なんでしょう */;

console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);
await /* 12トランザクションの実行 */(txHash);

let balance = await /* 13残高の取得 */(pg.wallet.publicKey);
console.log(
  `My balance before spawning a chest: ${balance / web3.LAMPORTS_PER_SOL} SOL`
);

txHash = await pg.program.methods
  .resetLevelAndSpawnChest()
  .accounts({
    chestVault: chestVaultAccount,
    gameDataAccount: globalLevel1GameDataAccount,
    payer: pg.wallet.publicKey,
    systemProgram: web3.SystemProgram.programId,
  })
  .signers([pg.wallet.keypair])
  .rpc();

console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);
await pg.connection.confirmTransaction(txHash);

console.log("Level reset and chest spawned 💎");
console.log("o........💎");

// Here we move to the right three times and collect the chest at the end of the level
for (let i = 0; i < 3; i++) {
  txHash = await pg.program.methods
    .moveRight()
    .accounts({
      chestVault: chestVaultAccount,
      gameDataAccount: globalLevel1GameDataAccount,
      systemProgram: web3.SystemProgram.programId,
      player: pg.wallet.publicKey,
    })
    .signers([pg.wallet.keypair])
    .rpc();

  console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);
  await pg.connection.confirmTransaction(txHash);
  let balance = await pg.connection.getBalance(pg.wallet.publicKey);
  console.log(`My balance: ${balance / web3.LAMPORTS_PER_SOL} SOL`);

  let gameDateAccount = await pg.program.account.gameDataAccount.fetch(
    globalLevel1GameDataAccount
  );

  console.log("Player position is:", gameDateAccount.playerPosition.toString());

  switch (gameDateAccount.playerPosition) {
    case 0:
      console.log("A journey begins...");
      console.log("o........💎");
      break;
    case 1:
      console.log("....o....💎");
      break;
    case 2:
      console.log("......o..💎");
      break;
    case 3:
      console.log(".........\\o/💎");
      console.log("...........\\o/");
      break;
  }
}
