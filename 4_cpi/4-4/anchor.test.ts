import * as anchor from "@coral-xyz/anchor";
import { BN, Program } from "@coral-xyz/anchor";
import { CpiInvoke } from "../target/types/cpi_invoke";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";

describe("cpi-invoke", () => {
  const provider = anchor; /* プロバイダーのURL*/

  console.log("provider:", provider);

  /* プロバイダーの設定　*/
  anchor.

  const program = anchor /* 今回のプログラムを呼び出す　*/ as Program<CpiInvoke>;

  const sender =  as anchor.Wallet;
  const recipient = 

  const transferAmount = 0.01 * ;

  it("SOL Transfer Anchor", async () => {
    const transactionSignature = await program.methods
      .solTransfer(new BN(transferAmount))
      .accounts({
        sender: sender.publicKey,
        recipient: recipient.publicKey,
      })
      .rpc();

    console.log(
      `\nTransaction Signature: https://solana.fm/tx/${transactionSignature}?cluster=devnet-solana`
    );
  });
});
