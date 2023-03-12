---
title: Change your editor
pubDate: 2023-02-13
date: 2023-02-22
slug: change-your-editor
description: Stop using vscode and switch to other Open Source alternatives!
tags:
  - emacs
  - neovim
  - editor
  - ide
draft: false
comments: true
---

After hearing a lot of people talk about how they love their vscode setup and how they
love the fact that vscode is open source _(it isn't open source btw)_, I decided to
make a small post walking people through what VSCode is and what alternatives they should use _(atleast try)_.

# What is VSCode

VSCode is Microsoft's version of Code - OSS. So they take this version of code, slap a
bunch of their logo's on there, integrate it with the the VScode marketplace and **most importantly**
add telemetry. I won't go into why this is bad, since it is all closed source we will never know for
sure.

So if possible avoid using VSCode, unless you really need to use their Live Share feature which as far as my knowledge goes, is not supported on neither VSCodium or Code OSS.

## Alternative: VSCodium/Code OSS

VSCodium provides the binary from building Microsoft's vscode repository while removing
the telemetry and other deeply nested links. This is under the MIT license. You can check
out their [website](https://vscodium.com/) and [github repo](https://github.com/VSCodium/vscodium).

Code OSS is the open source project([GitHub](https://github.com/microsoft/vscode)) that
Microsoft Visual Studio builds upon, i.e. with no propreitary code.

# Neovim

An open source project that is an extension of Vim that can be customized using lua.
It is free and open source, as well as being community led.

I will briefly go over how to get neovim setup. There are also quiet a few videos out
there on youtube and odysee that show how to make neovim your IDE in around 10 minutes.

You see more information on their [website](https://neovim.io) and their [GitHub repo](https://github.com/neovim/neovim)

Throughout the following "guide" which walks you through how to make a simple neovim
config like mine, you can visit the [GitHub repository for it](https://github.com/hegde-atri/.nvim).

> Update: In the quickstart guide below, I am using `packer.nvim`, but the recent trend has been to use `lazy.nvim`

## Getting Started

Your neovim configuration rests in the `~/.config/nvim` directory. Lets create a file
called `init.lua` here.

To make a "Clean configuration", we will be structuring the the directory as follows

```sh
.
├── after
│   └── plugin
├── lua
│   └── core
├── init.lua <---------- Referred to as top init.lua
```

Now let's make these directories

- `./after/plugin`:

This will contain all the plugin specific lua files. For example
I might have a `./after/plugin/prettier.lua` file with my prettier plugin settings.
All files in this directory will be loaded at runtime.

It will be empty for now but you will populate it as you install plugins.

- `./lua/core`

In this lua module we will have our core settings, such as initializing packer (our plugin manager of choice) and
making sure our plugins are installed. We will also set our keymaps and other vim
settings here.

## Core settings

Let's make a file `./lua/core/base.lua` to have all of our neovim settings.
These will include things life font family, font size etc. Here is an example
enabling relative line numbers.

**./lua/core/base.lua**

```lua
vim.opt.relativenumber = true
```

This is optional, but if you have remaps (remapping actions to custom keybinds) then
let's make `./lua/core/remaps.lua` file and put all of that in here.

**./lua/core/remaps.lua**

```lua
vim.g.mapleader = " "
vim.keymap.set("n", "<leader>pv", vim.cmd.Ex)
vim.keymap.set("n", "<leader>bs", vim.cmd.write)
```

To make all our files here accessible with just one import, let's create a file `./lua/
core/init.lua`.

**./lua/core/init.lua**

```lua
require("core.base")
require("core.remap")
```

## Getting plugins installed

We are gonna be using [packer.nvim](https://github.com/wbthomason/packer.nvim) which is
really easy to get started with. We will be using the code snippet under `Bootstrapping`
so that packer gets installed automatically on new computers using this config.
Let's make a `./lua/core/packer.lua` file and paste in the code snippet from their GitHub.
We will need to add this as an import to `./lua/core/init.lua`.

**./lua/core/init.lua**

```lua
...
require("core.packer")
```

Now let's close and open nvim, to see _packer_ being installed!

Lets get back into `./lua/core/packer.lua` and add the plugins we want.
For example some of the plugins you might want could be `lsp-zero` to
get an easy and quick lsp setup in neovim. You can read more about it on
its [GitHub page](https://github.com/VonHeikemen/lsp-zero.nvim)

**./lua/core/packer.lua**

```lua
...
use {
        'VonHeikemen/lsp-zero.nvim',
        requires = {
            -- LSP Support
            { 'neovim/nvim-lspconfig' },
            { 'williamboman/mason.nvim' },
            { 'williamboman/mason-lspconfig.nvim' },

            -- Autocompletion
            { 'hrsh7th/nvim-cmp' },
            { 'hrsh7th/cmp-buffer' },
            { 'hrsh7th/cmp-path' },
            { 'saadparwaiz1/cmp_luasnip' },
            { 'hrsh7th/cmp-nvim-lsp' },
            { 'hrsh7th/cmp-nvim-lua' },

            -- Snippets
            { 'L3MON4D3/LuaSnip' },
            { 'rafamadriz/friendly-snippets' },
        }
    }
...
```

Remember to run `:PackerSync` and `:PackerInstall` after adding new plugins.

## Configuring lsp-zero

We can now start configuring packer.nvim that we installed by creating the file
`./after/plugin/lsp.lua`

**./after/plugin/lsp.lua**

```lua
local lsp = require('lsp-zero')
lsp.preset('recommended')

lsp.ensure_installed({
  'tsserver',
  'eslint',
  'rust_analyzer',
  'gopls',
  'pyright',
})
lsp.setup()

```

# Emacs

If you really wanted to, you can do everything from this amazing text editor. It is well
out of this post's scope to set-up emacs as emacs configurations are usually quite opinionated.
I personally have been using a customized doom emacs config, but soon hoping
to move onto my own emacs config with emacs 29 when I get the free time.

The reason I said free time above is because I am very comfy and at home with my config
right now, it is **not** because it actually takes a long time to migrate. Since [Doom
Emacs](https://github.com/doomemacs/doomemacs) does a lot of things behind the scenes for the features I use. It would take some
time for me to implement the current exising features with the correct options enabled.
If I were using my own config for Emacs 28.2, it would be a lot quicker (like 2 minutes).

You can read my [Vanilla Emacs](emacs-config) and [Doom Emacs configuration](doom-emacs-config) posts.
