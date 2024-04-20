use anchor_lang::prelude::*;
use anchor_lang::solana_program::native_token::LAMPORTS_PER_SOL;
use anchor_lang::system_program;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("");

#[program]
mod tiny_adventure_two {
    use super::*;

    #[error_code]
    pub enum MyError {
        #[msg("Password was wrong")]
        WrongPassword,
    }

    // The amount of lamports that will be put into chests and given out as rewards.
    const CHEST_REWARD: u64 = LAMPORTS_PER_SOL / 10; // 0.1 SOL

    pub fn initialize_level_one(_ctx: Context<InitializeLevelOne>) -> Result<()> {
        // Usually in your production code you would not print lots of text because it costs compute units.
        msg!("A Journey Begins!");
        msg!("o.......💎");
        Ok(())
    }

    // this will set the player position of the given level back to 0 and fill up the chest with sol
    pub fn reset_level_and_spawn_chest(ctx: Context<SpawnChest>) -> Result<()> {
        ctx.accounts.game_data_account.player_position = 0;

        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.payer.to_account_info().clone(),
                to: ctx.accounts.chest_vault.to_account_info().clone(),
            },
        );
        system_program::transfer(cpi_context, CHEST_REWARD)?;

        msg!("Level Reset and Chest Spawned at position 3");

        Ok(())
    }

    pub fn move_right(ctx: Context<MoveRight>, password: String ) -> Result<()> {
        let game_data_account = &mut ctx.accounts.game_data_account;
        if game_data_account.player_position == 3 {
            msg!("You have reached the end! Super!");
        } else if game_data_account.player_position == 2 {
            game_data_account.player_position = game_data_account.player_position + 1;

            if password != "gib" {
                return err!(MyError::WrongPassword);
                //panic!("Password wrong. OMG!");
            }

            msg!(
                "You made it! Here is your reward {0} lamports",
                CHEST_REWARD
            );

            **ctx
                .accounts
                .chest_vault
                .to_account_info()
                .try_borrow_mut_lamports()? -= CHEST_REWARD;
            **ctx
                .accounts
                .player
                .to_account_info()
                .try_borrow_mut_lamports()? += CHEST_REWARD;
        } else {
            game_data_account.player_position = game_data_account.player_position + 1;
            print_player(game_data_account.player_position);
        }
        Ok(())
    }
}

fn print_player(player_position: u8) {
    if player_position == 0 {
        msg!("A Journey Begins!");
        msg!("o.........💎");
    } else if player_position == 1 {
        msg!("..o.......💎");
    } else if player_position == 2 {
        msg!("....o.....💎");
    } else if player_position == 3 {
        msg!("........\\o/💎");
        msg!("..........\\o/");
        msg!("You have reached the end! Super!");
    }
}

#[derive(Accounts)]
pub struct InitializeLevelOne<'info> {
    // We must specify the space in order to initialize an account.
    // First 8 bytes are default account discriminator,
    // next 1 byte come from NewAccount.data being type u8.
    // (u8 = 8 bits unsigned integer = 1 byte)
    // You can also use the signer as seed [signer.key().as_ref()],
    #[account(
        /* ①必要なら作成 */,
        /* ②level1というシード */,
        /* ③bump */,
        payer = signer,
        space = 8 + 1
    )]
    pub new_game_data_account: /* ④GameDataAccountの構造を持つアカウント */,
    // This is the PDA in which we will deposit the reward SOl and
    // from where we send it back to the first player reaching the chest.
    #[account(
        /* ⑤必要なら作成 */,
        /* ⑥chestVaultというシード */,
        /* ⑦bump */,
        payer = signer,
        space = 8
    )]
    pub chest_vault: /* ⑧ChestVaultAccountの構造を持つアカウント */,
    #[account(mut)]
    pub signer: /* ⑨署名の型 */,
    pub system_program: /* 10 システムプログラムの型 */,
}

#[derive(Accounts)]
pub struct SpawnChest<'info> {
    #[account(mut)]
    pub payer: /* 11署名の型 */,
    #[account(
        /* 12変更可能 */, 
        /* 13chestVaultというシード */,
        /* 14bump */,
    )]
    pub chest_vault: /* 15ChestVaultAccountの構造を持つアカウント */,
    #[account(mut)]
    pub game_data_account: /* 16GameDataAccountの構造を持つアカウント */,
    pub system_program: /* 17 システムプログラムの型 */,
}

#[derive(Accounts)]
pub struct MoveRight<'info> {
    #[account(
        /* 18変更可能 */, 
        /* 19chestVaultというシード */,
        /* 20bump */,
    )]
    pub chest_vault: /* 21ChestVaultAccountの構造を持つアカウント */,
    #[account(mut)]
    pub game_data_account: /* 22GameDataAccountの構造を持つアカウント */,
    #[account(mut)]
    pub player: /* 23署名の型 */,
    pub system_program: /* 24 システムプログラムの型 */,
}

#[account]
pub struct GameDataAccount {
    player_position: u8,
}

#[account]
pub struct ChestVaultAccount {}
