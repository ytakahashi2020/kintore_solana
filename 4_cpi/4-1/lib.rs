use anchor_lang::prelude::*;
use anchor_lang::solana_program::{/* ①invoke */, /* ②system_instruction　*/};

declare_id!("");

#[program]
pub mod cpi_invoke {
    use super::*;

    pub fn sol_transfer(ctx: Context<SolTransfer>, amount: u64) -> Result<()> {
        let from_pubkey = ctx.accounts.sender.to_account_info();
        let to_pubkey = ctx.accounts.recipient.to_account_info();
        let program_id = ctx.accounts.system_program.to_account_info();

        let instruction =
            &system_instruction::transfer(&from_pubkey.key(), &to_pubkey.key(), amount);

        invoke(instruction, &[from_pubkey, to_pubkey, program_id])?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SolTransfer<'info> {
    #[account(mut)]
    sender:  /*署名者*/,
    #[account(mut)]
    recipient: /*ウォレットアカウント*/,
    system_program:  /*システムプログラム*/,
}
