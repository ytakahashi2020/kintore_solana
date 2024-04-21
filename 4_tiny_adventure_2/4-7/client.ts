// The PDA adress everyone will be able to control the character if the interact with your program
const [globalLevel1GameDataAccount, bump] =
  await anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("level1", "utf8")],
    //[pg.wallet.publicKey.toBuffer()], <- You could also add the player wallet as a seed, then you would have one instance per player. Need to also change the seed in the rust part
    pg.program.programId
  );

// This is where the program will save the sol reward for the chests and from which the reward will be payed out again
const [chestVaultAccount, chestBump] =
  await anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("chestVault", "utf8")],
    pg.program.programId
  );

// Initialize level set the player position back to 0 and the caller needs to pay to fill up the chest with sol
let txHash = await pg.program.methods
  .initializeLevelOne()
  .accounts({
    chestVault: chestVaultAccount,
    newGameDataAccount: globalLevel1GameDataAccount,
    signer: pg.wallet.publicKey,
    systemProgram: web3.SystemProgram.programId,
  })
  .signers([pg.wallet.keypair])
  .rpc();

console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);
await pg.connection.confirmTransaction(txHash);

let balance = await pg.connection.getBalance(pg.wallet.publicKey);
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
  txHash = await /* ①メソッド */
    .moveRight()
    . /* ②なんでしょう */({
      chestVault: chestVaultAccount,
      gameDataAccount: globalLevel1GameDataAccount,
      systemProgram: /* ③システムプログラム */,
      player: /* ④署名者 */,
    })
    .signers([pg.wallet.keypair])
    ./* ⑤なんでしょう */;

  console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);
  await /* ⑥トランザクションの実行 */(txHash);
  let balance = await /* ⑦残高の取得 */(/* ⑧なんでしょう */);
  console.log(`My balance: ${balance / /* ⑨1SOLあたりのラムポート */} SOL`);

  let gameDateAccount = await /* 11アカウントの取得 */(
    globalLevel1GameDataAccount
  );

  console.log("Player position is:", gameDateAccount.playerPosition./* 12文字列に */);

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
