
// ①anchor_langのpreludeを使う

// ②idを宣言する

// ③プログラムを定義する
mod tiny_adventure {
    // ④親モジュールからのインポート

    pub fn initialize(/*　⑤Initializeという構造体の引数　*/,) -> /*　⑥戻り値　*/ {
        ctx.accounts.new_game_data_account.player_position = 0;
        msg!("A Journey Begins!");
        msg!("o.......");
        Ok(())
    }

    pub fn move_left(/*　⑦MoveLeftという構造体の引数　*/) -> /*　⑧戻り値　*/ {
        let game_data_account = &mut ctx.accounts.game_data_account;
        if game_data_account.player_position == 0 {
            msg!("You are back at the start.");
        } else {
            game_data_account.player_position -= 1;
            print_player(game_data_account.player_position);
        }
        Ok(())
    }

    pub fn move_right(/*　⑨MoveRightという構造体の引数　*/) -> /*　➓戻り値　*/  {
        let game_data_account = &mut ctx.accounts.game_data_account;
        if game_data_account.player_position == 3 {
            msg!("You have reached the end! Super!");
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

// 11 アカウントを使用する構造体
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

// 12 アカウントを使用する構造体
pub struct MoveLeft<'info> {
    #[account(mut)]
    pub game_data_account: Account<'info, GameDataAccount>,
}

// 13 アカウントを使用する構造体
pub struct MoveRight<'info> {
    #[account(mut)]
    pub game_data_account: Account<'info, GameDataAccount>,
}

// 14 アカウントの定義
pub struct GameDataAccount {
    player_position: u8,
}
