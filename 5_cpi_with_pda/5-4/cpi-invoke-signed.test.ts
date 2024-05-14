import * as anchor from "@coral-xyz/anchor";
import { BN, Program } from "@coral-xyz/anchor";
import { CpiInvokeSigned } from "../target/types/cpi_invoke_signed";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

describe("cpi-invoke-signed", () => {
  const provider = anchor/*AnchorProvider.env()*/;
  anchor/* setProvider*/(provider);

  const program = anchor/* program*/ */ as Program<CpiInvokeSigned>;

  const wallet = provider.wallet as anchor.Wallet;
  const [PDA] = PublicKey/*PDAの取得*/(
    /* pdaというシード*/ ,
    program.programId
  );

  const transferAmount = 0.01 * LAMPORTS_PER_SOL;

  it("PDA SOL Transfer invoke_signed", async () => {
    const transactionSignature = await program.methods
      .solTransfer(new BN(transferAmount))
      .accounts({
        pdaAccount: PDA,
        recipient: wallet.publicKey,
      })
      .rpc();

    console.log(
      `\nTransaction Signature: https://solana.fm/tx/${transactionSignature}?cluster=devnet-solana`
    );
  });
});
