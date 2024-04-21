// ①「counter」という非同期のテスト開始
    const systemProgram = /* ②システムプログラム */;
  // ③ テストケース１　「Create Counter!」（非同期）

      // Keypair = account
      const [counter, _counterBump] =
        await anchor.web3.PublicKey.findProgramAddressSync(
          [pg.wallet.publicKey.toBytes()],
          pg.program.programId
        );
      console.log("Your counter address", counter.toString());
      const tx = await pg.program.methods
        .createCounter()
        .accounts({
          authority: pg.wallet.publicKey,
          counter: counter,
          systemProgram: systemProgram.programId,
        })
        .rpc();
      console.log("Your transaction signature", tx);
    });
  
    // ④ テストケース2　「Fetch a Counter!」（非同期）
      // Keypair = account
      const [counterPubkey, _] = await anchor.web3.PublicKey.findProgramAddressSync(
        [pg.wallet.publicKey.toBytes()],
        pg.program.programId
      );
      console.log("Your counter address", counterPubkey.toString());
      const counter = await pg.program.account.counter.fetch(counterPubkey);
      console.log("Your counter", counter);
    });
  
    // ⑤ テストケース3　「Update a Counter!」（非同期）
      // Keypair = account
      const [counterPubkey, _] = await anchor.web3.PublicKey.findProgramAddressSync(
        [pg.wallet.publicKey.toBytes()],
        pg.program.programId
      );
      console.log("Your counter address", counterPubkey.toString());
      const counter = await pg.program.account.counter.fetch(counterPubkey);
      console.log("Your counter", counter);
      const tx = await pg.program.methods
        .updateCounter()
        .accounts({
          counter: counterPubkey,
        })
        .rpc();
      console.log("Your transaction signature", tx);
      const counterUpdated = await pg.program.account.counter.fetch(counterPubkey);
      console.log("Your counter count is: ", counterUpdated.count.toNumber());
    });
  });