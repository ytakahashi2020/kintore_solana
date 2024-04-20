// ①anchor_langのpreludeを使う

// ②idを宣言する


// ③プログラム始める

mod hello {
    use super::*;

    pub fn hello(ctx: Context<Hello>) -> Result<()> {
        msg!("hello, world!");
        Ok(())
    }
}

// ④アカウント付きの構造体を始める

pub struct Hello {}