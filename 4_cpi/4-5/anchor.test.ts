import * as anchor from "@coral-xyz/anchor";
import { BN, Program } from "@coral-xyz/anchor";
import { CpiInvoke } from "../target/types/cpi_invoke";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

describe("cpi-invoke", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.CpiInvoke as Program<CpiInvoke>;

  const sender = provider.wallet as anchor.Wallet;
  const recipient = new Keypair();

  const transferAmount = 0.01 * LAMPORTS_PER_SOL;

  it("SOL Transfer Anchor", async () => {
    const transactionSignature = await program.methods
      /* solTransferの実行 */ 
      .accounts({
        sender: sender.publicKey,
        recipient: recipient.publicKey,
      })
      .rpc();

    console.log(
      `\nTransaction Signature: https://solana.fm/tx/${transactionSignature}?cluster=devnet-solana`
    );
  });

  it("Normal Transfer", async () => {
    const transferInstruction = /* SystemProgramのtransfer */ ({
      fromPubkey: sender.publicKey,
      toPubkey: recipient.publicKey,
      lamports: transferAmount,
    });

    const transaction = /* transactionの作成 */;

    const transactionSignature = await /* transactionの送付 */(
      provider.connection,
      transaction,
      /* 署名者 */ // signer
    );

    console.log(
      `\nTransaction Signature: https://solana.fm/tx/${transactionSignature}?cluster=devnet-solana`
    );
  });
});
