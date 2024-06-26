const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

// Define the 'PublicKey' of the lookup table to fetch
const lookupTableAddress = new web3(
  /*Publickeyオブジェクトの作成*/ "oacZ24DG5vsL1dCPxjY8MsqAzzgAB2DbQo8ziJk3Tpw"
);

// Get the table from the cluster
const lookupTableAccount = await; /* ルックアップテーブルの取得 */

// 'lookupTableAccount' will now be an 'AddressLookupTableAccount' object

console.log("Table address from cluster:", lookupTableAccount.key.toBase58());

// Loop through and parse all the addresses stored in the table
for (let i = 0; i < lookupTableAccount /* */; i++) {
  const address = lookupTableAccount; /*  */
  console.log(i, address.toBase58());
}
