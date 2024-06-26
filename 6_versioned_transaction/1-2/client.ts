import { Keypair } from "@solana/web3.js";

// connect to the cluster and get the minimum rent for rent exempt status
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
let minRent = await connection.getMinimumBalanceForRentExemption(0);
let blockhash = await connection
  /* 最近のブロックハッシュの取得 */
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

const messageV0 = /* トランザクションメッセージの作成*/({
  payerKey: payer.publicKey,
  recentBlockhash: blockhash,
  instructions,
}) /* バージョン０に変換 */;

const transaction = new web3./* バージョン付きトランザクションに変換 */;

// sign your transaction with the required `Signers`
/* トランザクションの署名 */

const txId = await connection/* トランザクションの送付 */
console.log(`https://explorer.solana.com/tx/${txId}?cluster=devnet`);
