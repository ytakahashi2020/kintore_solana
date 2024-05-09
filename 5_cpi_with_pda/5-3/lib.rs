use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke_signed, system_instruction};

declare_id!("");

#[program]
pub mod cpi_invoke_signed {
    use super::*;

    pub fn sol_transfer(ctx: Context<SolTransfer>, amount: u64) -> Result<()> {
        let from_pubkey = ctx.accounts.pda_account.to_account_info();
        let to_pubkey = ctx.accounts.recipient.to_account_info();
        let program_id = ctx.accounts.system_program.to_account_info();

        let bump_seed = /* bump */;
        let signer_seeds: &[&[&[u8]]] = /* signer seeds */;

        let instruction =
            /* system_instructionのtransfer */(&from_pubkey.key(), &to_pubkey.key(), amount);

        invoke_signed(
            instruction,
            &[from_pubkey, to_pubkey, program_id],
            /* signer seeds */,
        )?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SolTransfer<'info> {
    #[account(
        mut,
        seeds = /* pda という文字*/, 
        bump, 
    )]
    pda_account: SystemAccount<'info>,
    #[account(mut)]
    recipient: SystemAccount<'info>,
    system_program: Program<'info, System>,
}
