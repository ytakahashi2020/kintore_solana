use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke, system_instruction};

declare_id!("");

#[program]
pub mod cpi_invoke {
    use super::*;

    pub fn sol_transfer(ctx: Context<SolTransfer>, amount: u64) -> Result<()> {
        let from_pubkey = ctx.accounts.sender/* AccountInfoの形に */;
        let to_pubkey = ctx.accounts.recipient/* AccountInfoの形に */;
        let program_id = ctx.accounts.system_program/* AccountInfoの形に */;

        let instruction =
            /* system_instructionのtransferを使う　*/(/* 送付元から*/, /* 送付先へから*/, amount);

        invoke(instruction, &[from_pubkey, to_pubkey, program_id])?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SolTransfer<'info> {
    #[account(mut)]
    sender: Signer<'info>,
    #[account(mut)]
    recipient: SystemAccount<'info>,
    system_program: Program<'info, System>,
}
