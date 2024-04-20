// ①anchor_langのpreludeを使う

// ②idを宣言する


// ③プログラム始める
// Smart contract functions
pub mod counter {
    // ④親モジュールからのインポート

    pub fn create_counter(/* ⑤CreateCounterという型のコンテキスト */) -> /* ⑥Result型の戻り値 */ {
        msg!("Creating a Counter!!");

        // The creation of the counter must be here
        let counter = &mut ctx.accounts.counter;
        counter.authority = ctx.accounts.authority.key();
        counter.count = 0;

        msg!("Current count is {}", counter.count);
        msg!("The Admin PubKey is: {} ", counter.authority);

        /* ⑦Result型の戻り値 */ 
    }

    pub fn update_counter(/* ⑧UpdateCounterという型のコンテキスト */) -> /* ⑨Result型の戻り値 */ {
        msg!("Adding 1 to the counter!!");

        // Updating the counter must be here
        let counter = &mut ctx.accounts.counter;
        counter.count += 1;

        msg!("Current count is {}", counter.count);
        msg!("{} remaining to reach 1000 ", 1000 - counter.count);

        /* 10Result型の戻り値 */
    }

}

// Data validators
// 11アカウント付きの構造体を始める
pub struct CreateCounter<'info> {
    #[account(mut)]
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

// 12アカウント付きの構造体を始める
pub struct UpdateCounter<'info> {
    authority: Signer<'info>,
    #[account(mut, has_one = authority)]
    counter: Account<'info, Counter>,
}

// Data structures
#[account]
pub struct Counter {
    authority: Pubkey,
    count: u64,
}
