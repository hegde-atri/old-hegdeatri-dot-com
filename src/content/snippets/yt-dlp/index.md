---
title: yt-dlp
description: Usefull yt-dlp commands for saving mp4 and mp3 files.
pubDate: 2023-02-07
date: 2023-02-09
slug: yt-dlp
tags:
  - yt-dlp
  - alias
---

After starting to use yt-dlp, I wanted to download some videos using the best audio
quality, here are the commands that are required to do so. You can set this as an
alias in your `.bashrc`/`.zshrc`

The `yt-mp3` also embeds the thumbnail as the cover and tries to add artist and 
title metadata from the video's title.

```sh
# For mp3's
yt-dlp -f 'ba' -x --audio-format mp3 -o '%(title)s.%(ext)s' --embed-thumbnail --parse-metadata 'title:%(artist)s - %(title)s'
# For videos
yt-dlp -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best' -o '(title)s.(ext)s'
```
