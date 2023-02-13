---
title: Change your editor
pubDate: 2023-02-13
date: 2023-02-13
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
├── init.lua
```

Now let's make these directories

- `./after/plugin`:

This will contain all the plugin specific lua files. For example
I might have a `./after/plugin/prettier.lua` file with my prettier plugin settings.
All files in this directory will be loaded at runtime.

- `./lua/core`

In this lua module we will have our core settings, such as initializing packer and
making sure our plugins are installed. We will also set our keymaps and other vim
settings here.

## Core settings

If you already have a `.vimrc` then you can transfer it to `./lua/core/base.lua`. Here
is an example line of what I would put here:

**./lua/core/base.lua**

```lua
vim.opt.relativenumber = true
```

I keep all my remaps in a file:

**./lua/core/remaps.lua**

```lua
vim.g.mapleader = " "
vim.keymap.set("n", "<leader>pv", vim.cmd.Ex)
vim.keymap.set("n", "<leader>bs", vim.cmd.write)

vim.keymap.set("v", "J", ":m '>+1<CR>gv=gv")
vim.keymap.set("v", "K", ":m '<-2<CR>gv=gv")

vim.keymap.set("n", "<C-d>", "<C-d>zz")
vim.keymap.set("n", "<C-u>", "<C-u>zz")

vim.keymap.set("n", "n", "nzzzv")
vim.keymap.set("n", "N", "Nzzzv")

vim.keymap.set("x", "<leader>p", "\"_dP")

vim.keymap.set("n", "<leader>y", "\"+y")
vim.keymap.set("v", "<leader>y", "\"+y")
vim.keymap.set("n", "<leader>Y", "\"+y")

vim.keymap.set("n", "<leader>d", "\"_d")
vim.keymap.set("v", "<leader>d", "\"_d")

vim.keymap.set("n", "<leader>f", function()
    vim.lsp.buf.format()
end)
```

To make all our files here accessible with just one import, let's create a file `./lua/core/init.lua`.

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
```

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
  'sumneko_lua',
  'rust_analyzer',
  'dockerls',
  'gopls',
  'jdtls',
  'pyright',
  'astro',
  'solargraph',
  'texlab',
  'prismals',
  'tailwindcss',
})

local cmp = require('cmp')
local cmp_select = {behaviour = cmp.SelectBehavior.Select}
local cmp_mappings = lsp.defaults.cmp_mappings({
  ['<C-p>'] = cmp.mapping.select_prev_item(cmp_select),
  ['<C-n>'] = cmp.mapping.select_next_item(cmp_select),
  ['<C-y>'] = cmp.mapping.confirm({ select = true }),
  ['<C-Space>'] = cmp.mapping.complete,
})

lsp.on_attach(function(client, bufnr)
  local opts = {buffer = bufnr, remap = false}
  vim.keymap.set("n", "gd", function() vim.lsp.buf.definition() end, opts)
  vim.keymap.set("n", "K", function() vim.lsp.buf.hover() end, opts)
  vim.keymap.set("n", "<leader>vws", function() vim.lsp.buf.workspace_symbol() end, opts)
  vim.keymap.set("n", "<leader>vd", function() vim.lsp.buf.open_float() end, opts)
  vim.keymap.set("n", "[d", function() vim.diagnostic.goto_next() end, opts)
  vim.keymap.set("n", "]d", function() vim.diagnostic.goto_prev() end, opts)
  vim.keymap.set("n", "<leader>vca", function() vim.lsp.buf.code_action() end, opts)
  vim.keymap.set("n", "<leader>vrr", function() vim.lsp.buf.references() end, opts)
  vim.keymap.set("n", "<leader>vrn", function() vim.lsp.buf.rename() end, opts)
  vim.keymap.set("n", "<C-h>", function() vim.lsp.buf.signature_help() end, opts)
end)

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
