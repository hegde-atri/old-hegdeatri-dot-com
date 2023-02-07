---
title: yt-dlp
description: Usefull yt-dlp commands for saving mp4 and mp3 files.
pubDate: 2023-02-07
slug: yt-dlp
keywords:
    - yt-dlp
    - alias
---

After starting to use yt-dlp, I wanted to download some videos using the best audio
quality, here are the commands that are required to do so. You can set this as an 
alias in your `.bashrc/.zshrc`

```sh
# For mp3's
yt-dlp -f 'ba' -x --audio-format mp3 -o '%(title)s.%(ext)s'
# For videos
yt-dlp -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best' -o '(title)s.(ext)s'
```