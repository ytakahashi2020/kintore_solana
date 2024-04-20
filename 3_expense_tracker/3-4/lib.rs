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
        let expense_account = &mut ctx.accounts.expense_account;

        expense_account.id = id;
        expense_account.merchant_name = merchant_name;
        expense_account.amount = amount;
        expense_account.owner = *ctx.accounts.authority.key;

        Ok(())
    }

    pub fn modify_expense(
        ctx: Context<ModifyExpense>,
        _id: u64,
        merchant_name: String,
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
    pub authority:  /* ①署名者しての型 */,

    #[account(
        init,
        payer = authority,
        space = 8 + 8 + 32+ (4 + 12)+ 8 + 1,
        seeds = [b"expense", authority.key().as_ref(), id.to_le_bytes().as_ref()], 
        bump
    )]
    pub expense_account: /* ②ExpenseAccountという構造体を持った型 */,

    pub system_program: /* ③System Programの型*/,
}

#[derive(Accounts)]
#[instruction(id : u64)]
pub struct ModifyExpense<'info> {
    #[account(mut)]
    pub authority: /* ④署名者しての型 */,

    #[account(
        mut,
        seeds = [b"expense", authority.key().as_ref(), id.to_le_bytes().as_ref()], 
        bump
    )]
    pub expense_account: /* ⑤ExpenseAccountという構造体を持った型 */,

    pub system_program: /* ⑥System Programの型*/,
}

#[derive(Accounts)]
#[instruction(id : u64)]
pub struct DeleteExpense<'info> {
    #[account(mut)]
    pub authority: /* ⑦署名者しての型 */,

    #[account(
        mut,
        close = authority,
        seeds = [b"expense", authority.key().as_ref(), id.to_le_bytes().as_ref()], 
        bump
    )]
    pub expense_account: /* ⑧ExpenseAccountという構造体を持った型 */,

    pub system_program:  /* ⑨System Programの型*/,
}

// 11 accountの構造体を定義
// 12 Defaultを実装
pub struct ExpenseAccount {
    pub id: u64,
    pub owner: /* 13公開鍵としての型 */,
    pub merchant_name: String,
    pub amount: u64,
}
