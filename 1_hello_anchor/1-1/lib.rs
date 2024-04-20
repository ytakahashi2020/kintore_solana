// ①anchor_langのpreludeを使う

// ②idを宣言する


// ③プログラムを定義する

mod hello {
    use super::*;

    pub fn hello(ctx: Context<Hello>) -> Result<()> {
        msg!("hello, world!");
        Ok(())
    }
}

// ④引数で使うアカウントを定義する

pub struct Hello {}