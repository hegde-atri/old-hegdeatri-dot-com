---
title: Different kernels in Arch
description: Installing other linux kernels such as linux-zen in Arch Linux
pubDate: 2023-03-16
date: 2023-03-16
slug: arch-kernels
tags:
  - archlinux
  - linux
  - kernels
  - linux-zen
---

# Why

Linux zen kernel provides some patches the best linux system possible for everyday systems.

## Getting the required modules

We will need to install the kernel itself.

```sh
sudo pacman -S linux-zen linux-zen-headers
```

If you are using a nvidia graphics card, replace your nvidia (drivers) package with nvidia-dkms package.

```sh
sudo pacman -S dkms nvidia-dkms
```

## Modifying GRUB

Now we are gonna change the grub config to make it easier to use with multiple kernels.
Lets open the grub config file using `sudo vim /etc/default/grub`.
Now modify the following properties (`GRUB_DEFAULT=saved` needs to added, isn't already present)

```sh
GRUB_DEFAULT=saved
GRUB_SAVEDDEFAULT=true
GRUB_DISABLE_SUBMENU=y
```

Then to apply the changes regenerate your grub config using:

```sh
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

_The location of your grub config might vary!_

Now you should be able to restart your computer and boot into your machine with the linux-zen kernel!
Souce engine based games seem to run much better now and the [zen-kernel](https://github.com/zen-kernel/zen-kernel) is
supposed to better for day to day use.

### Issues

- booting/logging in to a black screen: run `mkinitcpio -P`
