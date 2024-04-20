
// ①anchor_langのpreludeを使う

// ②idを宣言するdeclare_id!("");

// ③プログラムを定義する
pub mod etracker {

    // ④親モジュールからのインポート

    pub fn initialize_expense(
        /*　⑤InitializeExpenseという型の引数　*/,
        id: u64,
        merchant_name: String,
        amount: u64,
    ) -> /*　⑥戻り値　*/ {
        let expense_account = &mut ctx.accounts.expense_account;

        expense_account.id = id;
        expense_account.merchant_name = merchant_name;
        expense_account.amount = amount;
        expense_account.owner = *ctx.accounts.authority.key;

        // ⑦Result型でOkを返す
    }

    pub fn modify_expense(
        /*　⑧ModifyExpenseという型の引数　*/,
        _id: u64,
        merchant_name: String,
        amount: u64,
    ) -> /*　⑨戻り値　*/ {
        let expense_account = &mut ctx.accounts.expense_account;
        expense_account.merchant_name = merchant_name;
        expense_account.amount = amount;

        // ➓Result型でOkを返す
    }

    pub fn delete_expense(_ctx: Context<DeleteExpense>, _id: u64) -> /*　11戻り値　*/{
        // 12Result型でOkを返す
    }
}

// 13引数で使うアカウントを定義する
#[instruction(id : u64)]
/*　14外から呼べる構造体　*/  InitializeExpense<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer = authority,
        space = 8 + 8 + 32+ (4 + 12)+ 8 + 1,
        seeds = [b"expense", authority.key().as_ref(), id.to_le_bytes().as_ref()], 
        bump
    )]
    pub expense_account: Account<'info, ExpenseAccount>,

    pub system_program: Program<'info, System>,
}

// 15引数で使うアカウントを定義する
#[instruction(id : u64)]
/*　16外から呼べる構造体　*/  ModifyExpense<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [b"expense", authority.key().as_ref(), id.to_le_bytes().as_ref()], 
        bump
    )]
    pub expense_account: Account<'info, ExpenseAccount>,

    pub system_program: Program<'info, System>,
}

// 17引数で使うアカウントを定義する
#[instruction(id : u64)]
/*　18外から呼べる構造体　*/  DeleteExpense<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        close = authority,
        seeds = [b"expense", authority.key().as_ref(), id.to_le_bytes().as_ref()], 
        bump
    )]
    pub expense_account: Account<'info, ExpenseAccount>,

    pub system_program: Program<'info, System>,
}

#[account]
#[derive(Default)]
pub struct ExpenseAccount {
    pub id: u64,
    pub owner: Pubkey,
    pub merchant_name: String,
    pub amount: u64,
}
