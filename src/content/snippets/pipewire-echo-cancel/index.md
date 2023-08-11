---
title: Add Echo cancelling to your mic using pipewire!
pubDate: 2023-08-11
date: 2023-08-11
slug: pipewire-echo-cancel
description: In-built echo cancelling for your pipewire sources.
tags:
  - linux
  - pipewire
---

We will be adding a new source which will output the echo-cancelled audio.

Just create this config file with the following content.

**_~/.config/pipewire/pipewire.conf.d/echo-cancel.conf_**

```conf
 context.modules = [
  {   name = libpipewire-module-echo-cancel
      args = {
          # library.name  = aec/libspa-aec-webrtc
          # node.latency = 1024/48000
          # monitor.mode = false
          capture.props = {
             node.name = "Echo Cancellation Capture"
          }
          source.props = {
             node.name = "Echo Cancellation Source"
          }
          sink.props = {
             node.name = "Echo Cancellation Sink"
          }
          playback.props = {
             node.name = "Echo Cancellation Playback"
          }
      }
  }
]
```

_(This was taken from the official [pipewire documentation](https://docs.pipewire.org/page_module_echo_cancel.html))_

## Finishing touches

To make sure that your mic is loud enough, make sure to use `alsamixer` (available from `alsa-utils` package) and change the Internal Mic Boost to match your preferance.
