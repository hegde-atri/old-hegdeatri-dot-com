---
title: Emacs configuration
pubDate: 2023-03-01
date: 2023-03-01
slug: emacs-config
description: GNU Emacs is not just a text editor, it is the ultimate tool for productivity
tags:
  - emacs
  - editor
  - ide
  - org-mode
  - org-roam
draft: false
comments: true
---

GNU Emacs is not just a text editor, it\'s the ultimate tool for
productivity. This document contains my Emacs Configuration which is a
main part of my workflow everyday.

> I have tried Emacs just to deepen my knowledge and so that I am able to use Emacs from scratch. This really helped me build my [Doom emacs config](doom-emacs-config) that I use everyday.

# Startup performance

```lisp
;; -*- lexical-binding: t; -*-

;; The default is 800 kilobytes.  Measured in bytes.
(setq gc-cons-threshold (* 50 1000 1000))

;; Profile emacs startup
(add-hook 'emacs-startup-hook
          (lambda ()
            (message "*** Emacs loaded in %s seconds with %d garbage collections."
                     (emacs-init-time "%.2f")
                     gcs-done)))

```

# Native Compilation

Some options to improve experience on the `native-comp`
branch of Emacs.

```lisp

;; Silence compiler warnings as they can be pretty disruptive
(setq native-comp-async-report-warnings-errors nil)

;; Set the right directory to store the native comp cache
(add-to-list 'native-comp-eln-load-path (expand-file-name "eln-cache/" user-emacs-directory))

```

# Package management

I manage my Emacs packages using `package.el` and
`use-package`. I have an unless block making sure that
`use-package` is always installed, and packages installed
with use-package have `:ensure t` by default.

```lisp

(require 'package)
(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/") t)
(add-to-list 'package-archives '("gnu" . "https://elpa.gnu.org/packages/") t)
;; (add-to-list 'package-archives '("nongnu" . "https://elpa.nongnu.org/nongnu/") t)
(add-to-list 'package-archives '("org" . "https://orgmode.org/elpa/") t)

(package-initialize)
(unless package-archive-contents
  (package-refresh-contents))

(unless (package-installed-p 'use-package)
  (package-refresh-contents)
  (package-install 'use-package))

(require 'use-package)
(setq use-package-always-ensure t)

```

# Keep folders clean

Keep folders where we edit files clean of any file that emacs creates.

```lisp

(use-package no-littering)
(setq auto-save-file-name-transforms
    `((".*" ,(no-littering-expand-var-file-name "auto-save/") t)))

```

# General Configuration

## User Interface

Making the interface more minimal.

```lisp

(setq inhibit-startup-message t)

(tooltip-mode -1)        ; Disable tooltips
(menu-bar-mode -1)       ; Disable the menu bar
(tool-bar-mode -1)       ; Disable the tool bar
(scroll-bar-mode -1)     ; Disable the scrollbar
(setq visible-bell nil)  ; Visible bell disabled

(set-frame-parameter (selected-frame) 'alpha '(97 . 100))
(add-to-list 'default-frame-alist '(alpha . (90 . 90)))

```

Relative line numbers. Really helpful when using evil mode.

```lisp

(column-number-mode)                           ; Enable column number
(global-display-line-numbers-mode t)           ; Enable line numbers
(menu-bar-display-line-numbers-mode 'relative) ; Make line numbers relative

```

### Customize per mode

Remove line numbers in shell mode

```lisp

(dolist (mode '(term-mode-hook
                eshell-mode-hook
                treemacs-mode-hook))
  (add-hook mode (lambda () (display-line-numbers-mode 0))))

```

## Font

My font of choice often varies, but I keep coming back to
`JetBrains Mono`. I alternate between `Cantarell`
and `Overpass` for my variable space fonts.

```lisp

(defun ha/setup-font-main ()
  (set-face-attribute 'default nil :font "JetBrainsMono Nerd Font" :height 125 :weight 'light)
  (set-face-attribute 'fixed-pitch nil :font "JetBrainsMono Nerd Font" :height 125 :weight 'light)
  (set-face-attribute 'variable-pitch nil :font "Iosevka Aile" :height 140 :weight 'light))

```

Using all-the-icons for pretty icons.

```lisp

(use-package all-the-icons
  :ensure t)

```

Rainbow delimiters. (attached on any buffer with programming mode)

```lisp

(use-package rainbow-delimiters
  :hook (prog-mode . rainbow-delimiters-mode))

```

## Theme

I like to use doom themes and occasionally the included themes.

```lisp

(use-package doom-themes
  :config
  (load-theme 'doom-palenight t))

```

## Doom modeline

```lisp

(use-package doom-modeline
  :ensure t
  :init (doom-modeline-mode 1)
  :custom (
    (doom-modeline-height 40)
    (doom-modeline-battery t)))

```

## Keybind panel

I am using which-key that helps me discover new keybinds and provides a
pretty way to rediscover my keybinds.

```lisp

(use-package which-key
  :defer 0
  ;; :init (which-key-mode)
  :diminish which-key-mode
  :config
  (which-key-mode)
  (setq which-key-idle-delay 0.3))

```

## Ivy and Counsel

Ivy is my choice of completion engine for Emacs. Counsel gives me some
commands such as `counsel-find-file` replacing emacs
`find-file` with a much nicer minibuffer(ivy). Ivy-rich adds
extra information to a few Counsel commands.

```lisp

(use-package swiper)
(use-package ivy
  :diminish
  :bind (("C-s" . swiper)
         :map ivy-minibuffer-map
         ("TAB" . ivy-alt-done)
         ("C-l" . ivy-alt-done)
         ("C-j" . ivy-next-line)
         ("C-k" . ivy-previous-line))
  :config
  (ivy-mode 1))
(use-package counsel
  :bind(("M-x" . counsel-M-x)
        ("C-x b" . counsel-ibuffer)
        ("C-x C-f" . counsel-find-file))
  :config
  (setq ivy-initial-inputs-alist nil))

(use-package ivy-rich
  :after ivy
  :init
  (ivy-rich-mode 1))

```

# Keyboard bindings

## Escape all

This makes the `escape` key quit the minibuffer.

```lisp

(global-set-key (kbd "<escape>") 'keyboard-escape-quit)

```

## Evil time

```lisp

(use-package evil
  :init
  (setq evil-want-integration t)
  (setq evil-keybinding t)
  (setq evil-want-keybinding nil)
  (setq evil-want-C-u-scroll t)
  :config
  (evil-mode 1)
  (evil-global-set-key 'motion "j" 'evil-next-visual-line)
  (evil-global-set-key 'motion "k" 'evil-previous-visual-line)
  (evil-set-initial-state 'messages-buffer-mode 'normal)
  (evil-set-initial-state 'dashboard-mode 'normal))

```

Evil collection package to enhance our evil :smiling~imp~: experience.

```lisp

(use-package evil-collection
    :after evil
    :config
    (evil-collection-init))

```

## Leader keybinds

Easy leader keymaps using `general.el`.

```lisp

(use-package general
  :config
  (general-create-definer ha/leader-keys
    :keymaps '(normal insert visual emacs)
    :prefix "SPC"
    :global-prefix "C-SPC"))

```

## Basic keybinds with leader

### Base commands

```lisp
(ha/leader-keys
 "."  '(counsel-find-file :which-key "find file")
 "q"  '(:ignore t :which-key "emacs")
 "qq" '(save-buffers-kill-terminal :which-key "save and min")
 "qc" '(save-buffers-kill-emacs :which-key "save and close")
)
```

### Buffer commands

```lisp

(ha/leader-keys
 "b"  '(:ignore t :which-key "buffer")
 "bs" '(save-buffer :which-key "save")
 "bk" '(kill-current-buffer :which-key "kill")
 "bi" '(ibuffer :which-key "list")
 "bn" '(next-buffer :which-key "next buffer")
 "bu" '(previous-buffer :which-key "prev buffer")
)

```

### Window commands

```lisp

(defun toggle-window-split ()
(interactive)
(if (= (count-windows) 2)
    (let* ((this-win-buffer (window-buffer))
     (next-win-buffer (window-buffer (next-window)))
     (this-win-edges (window-edges (selected-window)))
     (next-win-edges (window-edges (next-window)))
     (this-win-2nd (not (and (<= (car this-win-edges)
         (car next-win-edges))
           (<= (cadr this-win-edges)
         (cadr next-win-edges)))))
     (splitter
      (if (= (car this-win-edges)
       (car (window-edges (next-window))))
    'split-window-horizontally
  'split-window-vertically)))
(delete-other-windows)
(let ((first-win (selected-window)))
  (funcall splitter)
  (if this-win-2nd (other-window 1))
  (set-window-buffer (selected-window) this-win-buffer)
  (set-window-buffer (next-window) next-win-buffer)
  (select-window first-win)
  (if this-win-2nd (other-window 1))))))

(ha/leader-keys
 "w"  '(:ignore t :which-key "window")
 "ws" '(split-window-vertically :which-key "vertical split")
 "wv" '(split-window-horizontally :which-key "horizontal split")
 "wc" '(delete-window :which-key "close window")
 "wh" '(evil-window-left :which-key "go to left window")
 "wl" '(evil-window-right :which-key "go to right window")
 "wj" '(evil-window-down :which-key "go down a window")
 "wk" '(evil-window-up :which-key "go up a window")
 "wH" '(evil-window-increase-height :which-key "increase height")
 "wL" '(evil-window-decrease-height :which-key "decrease height")
 "wJ" '(evil-window-increase-width :which-key "increase width")
 "wK" '(evil-window-decrease-width :which-key "decrease width")
 "w=" '(balance-windows :which-key "balance windows")
 "ww" '(toggle-window-split :which-key "change split")
)

```

### Theme toggle

```lisp

(ha/leader-keys
 "t"  '(:ignore t :which-key "toggles")
 "tt" '(counsel-load-theme :which-key "Choose theme"))

```

## Keymaps with Hydra

Cool/useful keymaps with hydra

```lisp

(use-package hydra
  :defer t)

(defhydra hydra-text-scale (:timeout 4)
  "scale text"
  ("j" text-scale-increase "in")
  ("k" text-scale-decrease "out")
  ("f" nil "finished" :exit t))

(ha/leader-keys
  "ts" '(hydra-text-scale/body :which-key "Scale text"))

```

# Org mode

## Base config

Configuring the org package.

```lisp

(defun ha/org-mode-setup ()
  (org-indent-mode)
  ;; (variable-pitch-mode 1)
  (auto-fill-mode 0)
  (visual-line-mode 1)
  ;; Enlarge latex preview
  (plist-put org-format-latex-options :scale 1.6)
  (setq org-return-follows-link t)
  (setq evil-auto-indent nil))

;; Replace list hyphen with dot.
(defun ha/org-font-setup ()
  (font-lock-add-keywords 'org-mode
                         '(("^ *\\([-]\\) "
                             (0 (prog1 () (compose-region (match-beginning 1) (match-end 1) "•"))))))
  ;; Change font size of headings.
  (dolist (face '((org-level-1 . 1.5)
                  (org-level-2 . 1.4)
                  (org-level-3 . 1.3)
                  (org-level-4 . 1.25)
                  (org-level-5 . 1.2)
                  (org-level-6 . 1.15)
                  (org-level-7 . 1.1)
                  (org-level-8 . 1.05)))
    (set-face-attribute (car face) nil :font "Overpass" :weight 'medium :height (cdr face)))

;; Fonts in org
  (set-face-attribute 'org-document-title nil :font "Iosevka Aile" :weight 'bold :height 1.3)
  (set-face-attribute 'org-block nil    :foreground nil :inherit 'fixed-pitch)
  (set-face-attribute 'org-table nil    :inherit 'fixed-pitch)
  (set-face-attribute 'org-formula nil  :inherit 'fixed-pitch)
  (set-face-attribute 'org-code nil     :inherit '(shadow fixed-pitch))
  (set-face-attribute 'org-table nil    :inherit '(shadow fixed-pitch))
  (set-face-attribute 'org-verbatim nil :inherit '(shadow fixed-pitch))
  (set-face-attribute 'org-special-keyword nil :inherit '(font-lock-comment-face fixed-pitch))
  (set-face-attribute 'org-meta-line nil :inherit '(font-lock-comment-face fixed-pitch))
  (set-face-attribute 'org-checkbox nil  :inherit 'fixed-pitch)
  (set-face-attribute 'line-number nil :inherit 'fixed-pitch)
  (set-face-attribute 'line-number-current-line nil :inherit 'fixed-pitch))

(use-package org
  :commands (org-capture org-agenda)
  :hook (org-mode . ha/org-mode-setup)
  :config
  (setq org-ellipsis " ▼ "
        org-hide-emphasis-markers t)
  (ha/org-font-setup))

```

## Org-agenda

Org agenda prefs. TODO: org-ql.

```lisp

;; (setq-default org-agenda-files '("~/org"))
(setq org-agenda-files (directory-files-recursively "~/org/" "\\.org$"))

;; Better priorities symbols
(use-package org-fancy-priorities
  :hook (org-mode .org-fancy-priorities-mode)
  :config
  (setq org-fancy-priorities-list '((?A . "❗")
                                    (?B . "⚡")
                                    (?C . "⬆")
  ))
)

```

Keybinds for org agenda.

```lisp

(ha/leader-keys
 "o"   '(:ignore t :which-key "org")
 "oa"  '(org-agenda :which-key "org-agenda")
 "od"  '(org-time-stamp :which-key "time stamp")
 "op" '(:ignore t :which-key "priority")
 "opp" '(org-priority :which-key "priority")
 "opu" '(org-priority-up :which-key "priority")
 "opd" '(org-priority-down :which-key "priority")
)
```

## Org bullets

Replace `*` with different bullets.

```lisp

(use-package org-bullets
  :hook (org-mode . org-bullets-mode)
  :custom
  (setq org-bullets-list '("◉" "●" "○" "◆" "●" "○" "◆")))

```

## Org TOC

A plugin that generates a TOC for org documents on save.

```lisp

(use-package org-make-toc)

```

## Org templates

Templates for expanding a source code block.

```lisp

(with-eval-after-load 'org
  (require 'org-tempo)
  (add-to-list 'org-structure-template-alist '("sh" . "src shell"))
  (add-to-list 'org-structure-template-alist '("el" . "src emacs-lisp"))
  (add-to-list 'org-structure-template-alist '("me" . "src mermaid :file d"))
  (add-to-list 'org-structure-template-alist '("python" . "src python"))
  (add-to-list 'org-structure-template-alist '("rs" . "src rust"))
  (add-to-list 'org-structure-template-alist '("cf" . "src conf")))

```

## Configure Babel languages

### Adding mermaid diagrams

```lisp

;; (use-package ob-mermaid)
;; (setq ob-mermaid-cli-path "/usr/bin/mmdc")

(with-eval-after-load 'org
  (org-babel-do-load-languages
    'org-babel-load-languages
    '((emacs-lisp . t)
      ;;(mermaid .t)
      ;;(scheme .t)
      (python . t))))

```

## Auto-tangle Configuration files

```lisp

;; Automatically tangle emacs.org whenever it is saved.
(defun ha/org-babel-tangle-config ()
  (when (string-equal (buffer-file-name)
                     (expand-file-name "~/.emacs.d/emacs.org"))
    (let ((org-confirm-babel-evaluate nil))
      (org-babel-tangle))))

(add-hook 'org-mode-hook (lambda () (add-hook 'after-save-hook #'ha/org-babel-tangle-config)))

```

## Visual fill column

Make working with org files pretty and centered.

```lisp

(defun ha/org-mode-visual-fill ()
  (setq visual-fill-column-width 100
        visual-fill-column-center-text t)
  (visual-fill-column-mode 1))

(use-package visual-fill-column
  :hook (org-mode . ha/org-mode-visual-fill))

```

## Org-present

Give presentations using org-mode.

```lisp

(use-package org-present)

;; Tweak our font sizes during present
(defun ha/org-present-start ()
  (setq-local face-remapping-alist '((default (:height 1.5) variable-pitch)
                                     (header-line (:height 4.0) variable-pitch)
                                     (org-document-title (:height 1.75) org-document-title)
                                     (org-code (:height 1.55) org-code)
                                     (org-verbatim (:height 1.55) org-verbatim)
                                     (org-block (:height 1.25) org-block)
                                     (org-block-begin-line (:height 0.7) org-block)))
  (setq header-line-format " ")
  (display-line-numbers-mode -1))

;; Undo tweaks
(defun ha/org-present-end ()
  (setq-local face-remapping-alist '((default variable-pitch default)))
  (setq header-line-format nil)
  (display-line-numbers-mode nil))

;; Preparing the slides
(defun ha/org-present-prepare-slide (buffer-name heading)
  (org-overview)
  (org-show-entry)
  (org-show-children))

(add-hook 'org-present-after-navigate-functions 'ha/org-present-prepare-slide)
(add-hook 'org-present-mode-hook 'ha/org-present-start)
(add-hook 'org-present-mode-quit-hook 'ha/org-present-end)

```

## Roam

Org-roam-v2! I use org-roam to take my notes, journal and keep track. If
you are not using it, you should definitely try it out.

```lisp

(use-package org-roam
  :ensure t
  :custom
  (org-roam-directory "~/org/roam")
  (org-roam-capture-templates
    '(("d" "default" plain
       "%?"
       :if-new (file+head "%<%Y%m%d%H%M%S>-${slug}.org" "#+title: ${title}\n#+date: %U\n#+startup: latexpreview\n")
       :unnarrowed t)
      ("m" "module" plain
       ;; (file "<path to template>")
       "\n* Module details\n\n- %^{Module code}\n- Semester: %^{Semester}\n\n* %?"
       :if-new (file+head "%<%Y%m%d%H%M%S>-${slug}.org" "#+title: ${title}\n#+startup: latexpreview\n")
       :unnarrowed t)
      ("b" "book notes" plain
       "\n* Source\n\n- Author: %^{Author}\n- Title: ${title}\n- Year: %^{Year}\n\n%?"
       :if-new (file+head "%<%Y%m%d%H%M%S>-${slug}.org" "#+title: ${title}\n#+startup: latexpreview\n")
       :unnarrowed t)
    )
  )
  (setq org-roam-dailies-capture-templates
    '(("d" "default" entry "* %<%H:%M>: %?"
       :ifnew (file+head "%<%Y-%m-%d>.org" "#+title: %<%Y-%m-%d>\n"))
    )
  )
  :bind-keymap
  ("C-c n d" . org-roam-dailes-map)
  :config
  (org-roam-setup))

;; Keybinds
(ha/leader-keys
 "n"  '(:ignore t :which-key "roam notes")
 "nt" '(org-roam-buffer-toggle :which-key "buffer toggle")
 "nf" '(org-roam-node-find :which-key "find node")
 "ni" '(org-roam-node-insert :which-key "insert node")
 "nb" '(org-roam-buffer-toggle :which-key "backlinks")
 "ng" '(org-roam-graph :which-key "graph")
 ;; Heading/Links
 "nh"  '(:ignore t :which-key "heading")
 "nhi" '(org-id-get-create :which-key "insert")
 "nha" '(org-roam-alias-add :which-key "add alias")
 "nhf" '(org-find-entry-with-id :which-key "find")
 ;; Dailies
 "nd"  '(:ignore t :whick-key "dailies")
 "ndn" '(org-roam-dailies-capture-today :whick-key "capture today")
 "ndN" '(org-roam-dailies-goto-today :which-key "goto today")
 "ndy" '(org-roam-dailies-goto-yesterday :which-key "goto yesterday")
 "ndY" '(org-roam-dailies-capture-yesterday :which-key "capture yesterday")
 "ndt" '(org-roam-dailies-goto-tomorrow :which-key "goto tomorrow")
 "ndT" '(org-roam-dailies-capture-tomorrow :which-key "capture tomorrow")
 "ndd" '(org-roam-dailies-capture-date :which-key "capture date")
 "ndD" '(org-roam-dailies-goto-date :which-key "goto date")
 "ndf" '(org-roam-dailies-goto-next-note :which-key "next note")
 "ndb" '(org-roam-dailies-goto-previous-note :which-key "prev note")
)

```

# Editing Configuration

## Tab widths

```lisp

(setq-default tab-width 2)
(setq-default evil-shift-width tab-width)

```

## Spaces instead of tabs

```lisp

(setq-default indent-tabs-mode nil)

```

## Commenting lines

Easier/better way to comment in emacs.

```lisp

(use-package evil-nerd-commenter
  :bind ("M-/" . evilnc-comment-or-uncomment-lines))

```

## Automatically clean whitespace

# Development

## Magit

The best git porcelain.

```lisp

(use-package magit
  :commands (magit-status magit-commit magit-push)
  :custom
  (magit-display-buffer-function #'magit-display-buffer-same-window-except-diff-v1))

```

Setting up keybinds for magit

```lisp

(ha/leader-keys
 "g"  '(:ignore t :which-key "Magit")
 "gg" '(magit-status :which-key "status")
 "gs" '(magit-status :which-key "status")
 "gc" '(magit-commit :which-key "commit")
 "gp" '(magit-push :which-key "push"))

```

### Forge

A package for GitHub integration with `Magit`.

```lisp

;; TODO, setup
(use-package forge
  :after magit)

```

## Projectile

```lisp

(use-package projectile
  :diminish projectile-mode
  :config (projectile-mode)
  :custom ((projectile-completion-system 'ivy))
  :bind-keymap
  ("C-c p" . projectile-command-map)
  :init
  (when (file-directory-p "~/repos")
    (setq projectile-project-search-path'("~/repos")))
  (setq projectile-switch-project-action #'projectile-dired))

(use-package counsel-projectile
  :after projectile
  :config (counsel-projectile-mode))

```

## Languages

### Language Servers

```lisp

(defun ha/lsp-mode-setup ()
  (setq lsp-headerline-breadcrumb-segments '(path-up-to-project file symbols))
  (lsp-headerline-breadcrumb-mode))

(use-package lsp-mode
  :commands (lsp lsp-deferred)
  :hook (lsp-mode . ha/lsp-mode-setup)
  :init
  (setq lsp-keymap-prefix "C-c l")
  :config
  (lsp-enable-which-key-integration t))

;; Enable debugger
(use-package dap-mode
  ;; :after lsp-mode
  :commands dap-debug)

```

1.  lsp-ui

    ```lisp

    (use-package lsp-ui
      :hook (lsp-mode . lsp-ui-mode)
      :custom
      (lsp-ui-doc-position 'bottom))

    ```

2.  lsp-treemacs

    ```lisp

    (use-package lsp-treemacs
      :after lsp)

    ```

    Also setting up keybinds for interacting with treemacs.

    ```lisp

    (ha/leader-keys
     "o"  '(:ignore t :which-key "open")
     "ot" '(treemacs :which-key "Treemacs")
     "os" '(lsp-treemacs-symbols :which-key "LSP treemacs symols")
     )

    ```

3.  lsp-ivy

    ```lisp

    (use-package lsp-ivy
      :after lsp)

    ```

### Rust

Make sure you have `rust-analyzer` installed.

```lisp

(use-package rust-mode
  :mode "\\.rs\\'"
  :hook (rust-mode . lsp-deferred)
  :init (setq rust-format-on-save t))

(use-package cargo
  :defer t)

```

### Astro

Hacked a way to get astro support. Found in `lsp-mode` github
issue.

```lisp

(define-derived-mode astro-mode web-mode "astro")
(setq auto-mode-alist
      (append '((".*\\.astro\\'" . astro-mode))
              auto-mode-alist))

(with-eval-after-load 'lsp-mode
  (add-to-list 'lsp-language-id-configuration
               '(astro-mode . "astro"))

  (lsp-register-client
   (make-lsp-client :new-connection (lsp-stdio-connection '("astro-ls" "--stdio"))
                    :activation-fn (lsp-activate-on "astro")
                    :server-id 'astro-ls)))

```

### Go

Make sure you have `gopls` installed.

```lisp

(use-package go-mode
  :hook (go-mode . lsp-deferred))

```

### TypeScript

Requires the typescript-language-server to be installed.

- `pacman -S typescript-language-server` - if using Arch
  Linux.
- `npm install -g typescript-language-server typescript` -
  Generic Install.

```lisp

(use-package typescript-mode
  :mode "\\.ts\\'"
  :hook (typescript-mode . lsp-deferred)
  :config
  (setq typescript-indent-level 2))

```

### HTML

```lisp

(use-package web-mode
  :mode "(\\.\\(html?\\|ejs\\|tsx\\|jsx\\)\\'"
  :config
  (setq-default web-mode-code-indent-offset 2)
  (setq-default web-mode-markup-indent-offset 2)
  (setq-default web-mode-attribute-indent-offset 2))

```

### Emacs Lisp

```lisp

(use-package helpful
  :commands (helpful-callable helpful-variable helpful-command helpful-key)
  :custom
  (counsel-describe-function-function #'helpful-callable)
  (counsel-describe-variable-function #'helpful-variable)
  :bind
  ([remap describe-function] . counsel-describe-function)
  ([remap describe-command] . helpful-command)
  ([remap describe-variable] . counsel-describe-variable)
  ([remap describe-key] . helpful-key))

```

### YAML

```lisp

(use-package yaml-mode
  :mode "\\.ya?ml\\'")

```

## Company mode

```lisp

(use-package company
  :after lsp-mode
  :hook (lsp-mode . company-mode)
  :bind (:map company-active-map
         ("<tab>" . company-complete-selection))
        (:map lsp-mode-map
         ("<tab>" . company-indent-or-complete-common))
  :custom
  (company-minimum-prefix-length 1)
  (company-idle-delay 0.0))

(use-package company-box
  :hook (company-mode . company-box-mode))

```

## Productivity

### Workspaces with persp-mode

I like having workspaces as I often will have to quickly switch
projects. Without having kill my other buffers, e.g. allows me to
seperate my notes from my projects. TODO: Setup doom emacs like
workspaces

```lisp

(use-package persp-mode
  :config
  (persp-mode 1))

(ha/leader-keys
 "TAB"  '(:ignore t :which-key "workspaces")
 "TAB n" '(persp-add-new :which-key "add")
)

```

### Dashboard

I think a cool dashboard makes me open emacs more and do work :)

```lisp

(use-package dashboard
  :config
  (dashboard-setup-startup-hook))

;; Make dashboard the default buffer in emacsclient
(setq initial-buffer-choice (lambda () (get-buffer "*dashboard*")))

```

### Highlight TODO

Highlight keywords like `TODO`, `FIXME`, etc.

```lisp

(use-package hl-todo
  :hook ((prog-mode . hl-todo-mode) (org-mode . hl-todo-mode))
  :config
  (setq hl-todo-highlight-punctuation ":"
        hl-todo-keyword-faces
        `(("TODO"        warning bold)
          ("FIXME"       error bold)
          ("HACK"        font-lock-constant-face bold)
          ("REVIEW"      font-lock-keyword-face bold)
          ("NOTE"        success bold)
          ("DEPRECATED"  font-lock-doc-face bold))))

```

# Runtime performance

Dial the GC threshold back down so GC happens more frequently but in
less time.

```lisp

(setq gc-cons-threshold (* 2 1000 1000))

```

# After frame hooks

For some reason, my emacs running in daemon mode fails to render the
correct fonts.

```lisp

;; Main fonts
(add-hook 'after-init-hook 'ha/setup-font-main)
(add-hook 'server-after-make-frame-hook 'ha/setup-font-main)
;; Fonts in org mode
(add-hook 'after-init-hook 'ha/org-font-setup)
(add-hook 'server-after-make-frame-hook 'ha/org-font-setup)

```
