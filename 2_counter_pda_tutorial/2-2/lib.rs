use anchor_lang::prelude::*;

declare_id!("");

#[program]
// Smart contract functions
pub mod counter {
    use super::*;

    pub fn create_counter(ctx: Context<CreateCounter>) -> Result<()> {
        msg!("Creating a Counter!!");

        // The creation of the counter must be here
        let counter = /* ①変更可 */ /* ②コンテキストのカウンター */;
        counter.authority = ctx.accounts.authority./* ③公開鍵 */;
        counter.count = 0;

        msg!("Current count is {}", counter.count);
        msg!("The Admin PubKey is: {} ", counter.authority);

        Ok(())
    }

    pub fn update_counter(ctx: Context<UpdateCounter>) -> Result<()> {
        msg!("Adding 1 to the counter!!");

        // Updating the counter must be here
        let counter = /* ④変更可 */ /* ⑤コンテキストのカウンター */;
        counter.count += 1;

        msg!("Current count is {}", counter.count);
        msg!("{} remaining to reach 1000 ", 1000 - counter.count);

        Ok(())
    }

}

// Data validators
// ⑥アカウントを使用する構造体
pub struct CreateCounter<'info> {
    // ⑦変更できるアカウント
    authority: Signer<'info>,
    #[account(
        init,
        seeds = [authority.key().as_ref()],
        bump,
        payer = authority,
        space = 100
    )]
    counter: Account<'info, Counter>,
    system_program: Program<'info, System>,
}

// ⑧アカウントを使用する構造体
pub struct UpdateCounter<'info> {
    authority: Signer<'info>,
    #[account(mut, has_one = authority)]
    counter: Account<'info, Counter>,
}

// Data structures
// ⑨アカウント
pub struct Counter {
    authority: Pubkey,
    count: u64,
}
