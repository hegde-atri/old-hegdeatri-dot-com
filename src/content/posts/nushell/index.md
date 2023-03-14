---
title: Switching to NuShell
pubDate: 2023-03-15
date: 2023-03-15
slug: switching-to-nushell
description: ZSH is feature rich, but slow at best. Making me switch to NuShell which describes itself as a new type of shell, and it's written in rust!
tags:
  - nushell
  - zsh
  - bash
draft: false
comments: true
---

# Prelude

I have using BASH and ZSH for a long time now, spent most of my early days using exclusively bash, and then moved onto ZSH a couple of months ago. I used its capabilities to the fullest, loading compinit, syntax highlighting, auto-suggestions and some other programs I had installed were also being initialised here. The programs were:

- zoxide
- rbenv
- NVM
- SDKMAN

> I have mentioned my zsh config multiple times now. You can check it out, along with all my other configurations in my [dotfiles repository](https://github.com/dotfiles).

# Startup time

My main reason for moving onto `nushell` was the startup times. ZSH always took more than half a second to open up. Although it wasn't an immediate issue. It was something that I needed to address at some point. I never leave terminals open, and don't use a terminal multiplexer like `tmux`, but open and close the terminal very frequently so I noticed it quite a lot. I didn't want to go back to bash, since I had some time and wanted to explore something new.

| Shell   | Time taken (10 launches) |
| ------- | ------------------------ |
| NuShell | ~0.01s                   |
| Bash    | ~0.13s                   |
| ZSH     | ~0.65s                   |

I used `time zsh -i -c exit` to test the startup times.

_(Let me know if there is a better way of testing the start times in the comments)_

# Completion system

Hopping into nushell, I thought I was going to be dissappointed in the completion system. Boy was I every wrong!! The configuration hinted me to look at [carapace](https://github.com/rsteube/carapace-bin) - "a multi-shell multi-command argument completer" for completion. Installation was pretty straight forward from the projects README.
It surprisingly hasn't failed me a single time so far, and is quick and snappy 😋.

# Alternatives to popular POSIX programs

I am now on a road to convert as many programs as I can to those written in Rust/C or something that is **blazingly fast** Here is the list of alternatives that I use, that are either written in Rust or is compatible with nushell.

If you have any alternatives that I haven't heard about, let me know in the comments!

- zoxide: (written in rust🦀) Inspired by `z` and `autojump`.
- fnm: (written in rust🦀) Fast and Simple node manager, my replacement of choice for `NVM`.

# Conclusion

I have really enjoyed using nushell, and will be using it as my system shell from now on. I'm not sure if I'll be changing all my shell scripts
since they _work_ and its currently using DASH which is much faster than bash/ZSH could ever be.
