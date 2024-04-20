use anchor_lang::prelude::*;

declare_id!("");

#[program]
mod hello {
    // ①親モジュールからのインポート

    pub fn hello(/*②引数*/) -> /*③戻り値*/ {
        msg!("hello, world!");
        // ④Result型でOkを返す
    }
}
#[derive(Accounts)]
/*⑤外から呼べる構造体*/ Hello {}