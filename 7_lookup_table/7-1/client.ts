const payer = pg.wallet;

// connect to a cluster and get the current `slot`
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
const slot = await /* 最新のスロットの取得 */;
// Assumption:
// `payer` is a valid `Keypair` with enough SOL to pay for the execution

const [lookupTableInst, lookupTableAddress] =
  web3./*ルックアップテーブルの作成*/({
    authority: payer.publicKey,
    payer: payer.publicKey,
    recentSlot: ,
  });

console.log("lookup table address:", lookupTableAddress.toBase58());

// To create the Address Lookup Table onchain:
// send the `lookupTableInst` instruction in a transaction

// add addresses to the `lookupTableAddress` table via an `extend` instruction
const extendInstruction = web3./*ルックアップテーブルの拡張*/({
  payer: payer.publicKey,
  authority: payer.publicKey,
  lookupTable: lookupTableAddress,
  addresses: [
    payer.publicKey,
    web3.SystemProgram.programId,
    // ⇩適当なアドレスです。
    new web3.PublicKey("31Jy3nFeb5hKVdB4GS4Y7MhU7zhNMFxwF7RGVhPc1TzR"),
    new web3.PublicKey("HKSeapcvwJ7ri6mf3HwBtspLFTDKqaJrMsozdfXfg5y2"),
    // new anchor.web3.PublicKey("6NKkyM14Q8DpPGBY6S5UXoy1arrPSrQ9a2vWErNzNm12"),
    // list more `publicKey` addresses here
  ],
});

// console.log("lookupTableAccount", lookupTableAccount);
let { blockhash } = await connection.getLatestBlockhash();

// construct a v0 compatible transaction `Message`
const messageV0 = new web3.TransactionMessage({
  payerKey: payer.publicKey,
  recentBlockhash: blockhash,
  instructions: [lookupTableInst, extendInstruction], // note this is an array of instructions
}).compileToV0Message();

// create a v0 transaction from the v0 message
const transactionV0 = new web3.VersionedTransaction(messageV0);

// sign the v0 transaction using the file system wallet we created named `payer`
transactionV0.sign([payer.keypair]);

// send and confirm the transaction
// // (NOTE: There is NOT an array of Signers here; see the note below...)
const transactionSignature = await connection.sendTransaction(transactionV0);

console.log(
  `Transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
);
