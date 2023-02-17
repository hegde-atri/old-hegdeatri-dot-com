---
title: Migrating from my old site!
pubDate: 2023-01-30
date: 2023-02-17
slug: first-post
description: Journey of my website from plain HTML to Zola to Astro!
tags:
  - astro
  - web dev
draft: false
comments: true
---

About 10 months ago, I made my first website. This was just plain HTML and CSS, but I quickly
moved onto a static site generator called [zola](https://www.getzola.org). I used a prebuilt theme
and called it a day. You can still visit it [here](https://old.hegdeatri.com). But as I got deeper and deeper into programming, learning linux and self-hosting,
I wasn't content with someone else's theme. I wanted to make my own theme.

## Choosing the framework

Now that I had decided to make my own site, there were so many to choose from. I was definitely not going
to choose Angular despite having the most experience in it, because it felt too clunky. I wanted my site
to be blazingly fast as possible. So I explored SSG's such as Hugo, Gatsby and Next.js. I tried Next.js
as I intended to use it for my freelance projects as well. The result of this was
[nextjs-hegdeatri-dot-com](https://nextjs-hegdeatri.com). Although I learnt a lot, since it was my
first time using Nextjs and Tailwindcss, I was not happy. I had rushed it, there was not enough planning.

### In comes Astro

After watching a video on Astro.build on Odysee, I had made up my mind, I was going to use Astro.
The concept of opt-in javascript was just what I wanted. Since it was also at this point, I had
started to avoid using javascript, and started disliking it strictly from a language point of view.
But I didn't want to rush the development, since I lacked motivation and had no clear design principles
for the site and didn't want the Next.js disaster to repeat.

## Development

I didn't know how to implement most of the features I wanted to so development was a really slow
and painstaking process, since I had just started university and didn't have time for this.
After 2 months, I had a Eureka moment! I knew what I wanted now, so I started reading up the docs
and building up the website.

### Problems I encountered

- A lot of things I wanted to do didn't have extensive docs, and experimenting was required, especially for remark/rehype.
  I couldn't get remark working, so I had to use rehype instead.
- Page sometimes flashes theme when route not hydrated. I could not seem to solve this issue 🤔.
- This website is almost javascript free apart from the Theme switcher, [comments](https://github.com/utterance/utterances)
  (Under MIT License) and [Icons](https://github.com/iconify/iconify)(Under MIT License). This means that you can easily browse
  most of my website without loading any javascript!!
- Mobile friendly, I not motivated to making a mobile first approach. That being said my website is still 100% usuable on a
  mobile phone, except from the navbar which is hard to use, but will be updated to be 100% usable in the near future.
- The urge to create eye-candy javascript bloated animations/effects but I wanted my site to be clean and minimal.

### Mobile design

For now I am just trying to get everything working on desktop. The mobile version of this website will be an afterthought.
However I aim to make the website completely usuable, altough it might lack some features (such as the toc table on posts).
I plan to remove all the bloat on mobile phones using media queries (useless icons won't be eating up the space), getting
rid of this bloat, and a bunch of margins/paddings, will make an easy port to mobile devices.

## Migration

Although I could copy the markdown files of my posts to this site without affecting the links, I felt
like a clean slate was what I needed. This was mostly since I became more knowledgable about the things
I am passionate about, my opinions and view have changed quite a bit from earlier. I do plan on re-writing a
few articles for the new website.

## Conclusion

1 month later, and here we are! I think the website looks beautiful, although I wouldn't recommend turning
on light mode 😅. There are still a few features missing, like search and the projects page. There are a few easter eggs such as
being able to activate the hidden light mode 😲, try and find them!

Overall I think Astro is a really cool framework and I'll definitely be using it for upcoming projects.
