import { Keypair } from "@solana/web3.js";

// connect to the cluster and get the minimum rent for rent exempt status
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
let minRent = await connection.getMinimumBalanceForRentExemption(0);
let blockhash = await connection
  /*ブロックハッシュの取得*/()
  .then((res) => res.blockhash);

const payer = pg.wallet;
const toAccount = new Keypair();
// create an array with your desired `instructions`
const instructions = [
  web3.SystemProgram.transfer({
    fromPubkey: payer.publicKey,
    toPubkey: toAccount.publicKey,
    lamports: minRent,
  }),
];

const messageV0 = new web3./* transaction messageの作成*/({
  payerKey: payer.publicKey,
  recentBlockhash: /* 最近のブロックハッシュ */,
  instructions,
})/* バージョン0に */;

const transaction = new web3.VersionedTransaction(messageV0);

// sign your transaction with the required `Signers`
transaction.sign([payer.keypair]);

const txId = await connection.sendTransaction(transaction);
console.log(`https://explorer.solana.com/tx/${txId}?cluster=devnet`);
