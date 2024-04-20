use anchor_lang::prelude::*;

// Your program Id will be added here when you enter "build" command
declare_id!("");

#[program]
pub mod etracker {

    use super::*;

    pub fn initialize_expense(
        ctx: Context<InitializeExpense>,
        id: u64,
        merchant_name: String,
        amount: u64,
    ) -> Result<()> {
        let expense_account = /* ①変更できる*/ /* ②引数のexpense_accountを取得する*/;

        // ③idに代入
        // ④merchant_nameに代入
        // ⑤amountに代入
        // ⑥ownerに代入

        Ok(())
    }

    pub fn modify_expense(
        ctx: Context<ModifyExpense>,
        _id: u64,
        merchant_name: String,
        amount: u64,
    ) -> Result<()> {
        let expense_account = /* ⑦変更できる*/ /* ⑧引数のexpense_accountを取得する*/;
        // ⑨merchant_nameに代入
        // 10amountに代入


        Ok(())
    }

    pub fn delete_expense(_ctx: Context<DeleteExpense>, _id: u64) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
// 11引数としてidを使用
pub struct InitializeExpense<'info> {
    // 12 変更可能なアカウント
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

#[derive(Accounts)]
// 13引数としてidを使用
pub struct ModifyExpense<'info> {
    // 14 変更可能なアカウント
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [b"expense", authority.key().as_ref(), id.to_le_bytes().as_ref()], 
        bump
    )]
    pub expense_account: Account<'info, ExpenseAccount>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
// 15引数としてidを使用
pub struct DeleteExpense<'info> {
    // 16 変更可能なアカウント
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
