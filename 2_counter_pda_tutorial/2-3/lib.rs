use anchor_lang::prelude::*;

declare_id!("");

#[program]
// Smart contract functions
pub mod counter {
    use super::*;

    pub fn create_counter(ctx: Context<CreateCounter>) -> Result<()> {
        msg!("Creating a Counter!!");

        // The creation of the counter must be here
        let counter = /* 前回の復習 */
        counter.authority =  /* 前回の復習 */
        counter.count = 0;

        msg!("Current count is {}", counter.count);
        msg!("The Admin PubKey is: {} ", counter.authority);

        Ok(())
    }

    pub fn update_counter(ctx: Context<UpdateCounter>) -> Result<()> {
        msg!("Adding 1 to the counter!!");

        // Updating the counter must be here
        let counter =  /* 前回の復習 */
        counter.count += 1;

        msg!("Current count is {}", counter.count);
        msg!("{} remaining to reach 1000 ", 1000 - counter.count);

        Ok(())
    }

}

// Data validators
#[derive(Accounts)]
pub struct CreateCounter<'info> {
    #[account(mut)]
    authority: /* ①署名者の型 */,
    #[account(
        /* ②初期化 */,
        /* ③権限のあるキーのシード */,
        /* ④bump */,
        payer = authority,
        space = 100
    )]
    counter: /* ⑤Counterの構造体のアカウント */,
    system_program: /* ⑥システムプログラム */,
}

#[derive(Accounts)]
pub struct UpdateCounter<'info> {
    authority: /* ⑦署名者の型 */,
    #[account(
        /* ⑧変更可 */,
        /* ⑨権限の一致 */,
    )]
    counter: /* 10Counterの構造体のアカウント */,
}

// Data structures
#[account]
pub struct Counter {
    authority: /* 11公開鍵の型 */,
    count: u64,
}
