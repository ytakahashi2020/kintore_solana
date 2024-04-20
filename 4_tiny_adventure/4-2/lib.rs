use anchor_lang::prelude::*;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("");

#[program]
mod tiny_adventure {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        /* ①引数の新しくできたアカウントの値*/ = 0;
        msg!("A Journey Begins!");
        msg!("o.......");
        // ②Result型でOkを返す
    }

    pub fn move_left(ctx: Context<MoveLeft>) -> Result<()> {
        let game_data_account = /* ③変更可能 */ /* ④引数のアカウント */ ;
        if /* ⑤アカウントの値 */ == 0 {
            msg!("You are back at the start.");
        } else {
            /* ⑥アカウントの値 */ -= 1;
            print_player(/* ⑦アカウントの値 */);
        }
        Ok(())
    }

    pub fn move_right(ctx: Context<MoveRight>) -> Result<()> {
        let game_data_account = /* ⑧変更可能 */ /* ⑨引数のアカウント */;
        if /* ➓アカウントの値 */ == 3 {
            msg!("You have reached the end! Super!");
        } else {
            /* 11アカウントの値 */ += 1;
            print_player(/* 12アカウントの値 */);
        }
        Ok(())
    }
}

fn print_player(player_position: u8) {
    if player_position == 0 {
        msg!("A Journey Begins!");
        msg!("o.......");
    } else if player_position == 1 {
        msg!("..o.....");
    } else if player_position == 2 {
        msg!("....o...");
    } else if player_position == 3 {
        msg!("........\\o/");
        msg!("You have reached the end! Super!");
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    // We must specify the space in order to initialize an account.
    // First 8 bytes are default account discriminator,
    // next 1 byte come from NewAccount.data being type u8.
    // (u8 = 8 bits unsigned integer = 1 byte)
    // You can also use the signer as seed [signer.key().as_ref()],
    #[account(
        init_if_needed,
        seeds = [b"level1"],
        bump,
        payer = signer,
        space = 8 + 1
    )]
    pub new_game_data_account: Account<'info, GameDataAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct MoveLeft<'info> {
    #[account(mut)]
    pub game_data_account: Account<'info, GameDataAccount>,
}

#[derive(Accounts)]
pub struct MoveRight<'info> {
    #[account(mut)]
    pub game_data_account: Account<'info, GameDataAccount>,
}

#[account]
pub struct GameDataAccount {
    player_position: u8,
}
