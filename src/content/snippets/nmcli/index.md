---
title: Manage your dns using nmcli
description: Manually set your dns while rejecting the network defaults.
pubDate: 2023-09-15
date: 2023-09-15
slug: nmcli
tags:
  - pihole
  - nmcli
---

I use pi-hole to block my ads and as a recursive dns server. I would like to take full advantage by keeping my pihole the only dns address.

```sh
# Set your DNS
nmcli con mod $connection ipv4.dns "your-dns-server"
# Ignore auto-dns
nmcli con mod $connection ipv4.ignore-auto-dns yes
```
