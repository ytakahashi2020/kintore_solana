use anchor_lang::prelude::*;

// Your program Id will be added here when you enter "build" command
declare_id!("");

#[program]
pub mod etracker {

    use super::*;

    pub fn initialize_expense(
        ctx: Context<InitializeExpense>,
        id: /* ①u64型*/ ,
        merchant_name: /* ②String型*/,
        amount: u64,
    ) -> Result<()> {
        let expense_account = &mut ctx.accounts.expense_account;

        expense_account.id = id;
        expense_account.merchant_name = merchant_name;
        expense_account.amount = amount;
        expense_account.owner = *ctx.accounts.authority.key;

        Ok(())
    }

    pub fn modify_expense(
        ctx: Context<ModifyExpense>,
        _id: /* ③u64型*/ ,
        merchant_name: /* ④String型*/,
        amount: u64,
    ) -> Result<()> {
        let expense_account = &mut ctx.accounts.expense_account;
        expense_account.merchant_name = merchant_name;
        expense_account.amount = amount;

        Ok(())
    }

    pub fn delete_expense(_ctx: Context<DeleteExpense>, _id: u64) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(id : u64)]
pub struct InitializeExpense<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        /* ⑤初めて作る*/,
        payer = authority,
        space = 8 + 8 + 32+ (4 + 12)+ 8 + 1,
        // ⑥seed値を設定（"expense"のバッファと権限キーとidをくっつけたもの）
        // ⑦bump値を設定
    )]
    pub expense_account: Account<'info, ExpenseAccount>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(id : u64)]
pub struct ModifyExpense<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        // ⑧変更可能
        // ⑨seed値を設定（"expense"のバッファと権限キーとidをくっつけたもの）
        // ➓bump値を設定
    )]
    pub expense_account: Account<'info, ExpenseAccount>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(id : u64)]
pub struct DeleteExpense<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        // 11変更可能
        close = authority,
        // 12seed値を設定（"expense"のバッファと権限キーとidをくっつけたもの）
        // 13bump値を設定
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
