---
title: Doom Emacs configuration
pubDate: 2023-03-12
date: 2023-03-12
slug: doom-emacs-config
description: Doom Emacs helps keeping all the packages up to date and work cohesively with minimal effort. Emacs is the one thing I always have open on my computer.
tags:
  - emacs
  - editor
  - ide
  - org-mode
  - org-roam
draft: false
comments: true
---

# Preface

GNU Emacs is not just a text editor, it's the ultimate tool for
productivity. This document contains my Emacs Configuration which is a
main part of my workflow everyday.

## Note taking

I manage my notes using org-roam. Here is a screenshot of my workflow.

I have Emacs, org-roam-ui and ncmpcpp open.

![](/assets/posts/emacs/note-taking.png)

# User Interface

## Name and Email

```lisp
;;; $DOOMDIR/config.el -*- lexical-binding: t; -*-

(setq user-full-name "Atri Hegde"
      user-mail-address "atri@hegdeatri.com")

```

## Doom fonts

```lisp

(setq doom-font (font-spec :family "JetBrains Mono" :size 15 :weight 'regular)
      doom-variable-pitch-font (font-spec :family "Iosevka Aile" :size 15 :weight 'regular))
```

## Doom theme

```lisp
(setq doom-theme 'doom-palenight)
```

## Doom modeline

```lisp
(setq doom-modeline-enable-word-count t)
```

## Line numbers

```lisp
(setq display-line-numbers-type 'relative)
```

## RGB module

Fix conflict for RGB module.

```lisp
(add-hook! 'rainbow-mode-hook
  (hl-line-mode (if rainbow-mode -1 +1)))
```

## Dashboard customisation

```lisp
(setq fancy-splash-image "~/.config/doom/doom-emacs-dash.png")
(add-hook! '+doom-dashboard-functions :append
           (insert "\n" (+doom-dashboard--center +doom-dashboard--width "Any text editor can save your files, only Emacs can save your soul!")))

```

## Evil mode

Making it so that we go to next visual line in evil mode.

```lisp
(evil-global-set-key 'motion "j" 'evil-next-visual-line)
(evil-global-set-key 'motion "k" 'evil-previous-visual-line)
```

# Org mode

## General customisation

I also install org-appear, to reveal emphasis markers when moving the
cursor over them.

_Tangles to ~/.config/doom/packages.el_

```lisp
(package! org-appear
  :recipe (:host github
           :repo "awth13/org-appear"))
```

```lisp

(setq org-directory "~/org/")

(defun ha/org-mode-visual-fill ()
  (setq visual-fill-column-width 100
        visual-fill-column-center-text t)
  (visual-fill-column-mode 1))
;; Setting up hook for visual fill
(add-hook 'org-mode 'ha/org-mode-visual-fill)

(defun ha/org-setup ()
  (setq org-log-done 'time)
  (setq org-hide-emphasis-markers t)
  ;; Enlarge latex preview
  (plist-put org-format-latex-options :scale 2)
  (add-hook! org-mode :append #'org-appear-mode)
)


(defun ha/org-font-setup ()
  ;; Doesn't work in Doom emacs
  ;;(font-lock-add-keywords 'org-mode
  ;;                       '(("^ *\\([-]\\) "
  ;;                           (0 (prog1 () (compose-region (match-beginning 1) (match-end 1) "•"))))))
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

(after! org
  (ha/org-setup)
  (ha/org-font-setup)
  (setq
        org-ellipsis " ▼ "
        org-hide-emphasis-markers t
        org-superstar-headline-bullets-list '("◉" "●" "○" "◆" "●" "○" "◆")))

```

## Org roam

```lisp

(after! org
  (setq org-roam-directory "~/org/roam")
  (setq org-roam-capture-templates
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
  (org-roam-setup))
```

## org-auto-tangle

_Tangles to ~/.config/doom/packages.el_

```lisp
(package! org-auto-tangle)
```

```lisp
(after! org-auto-tangle
  (add-hook! org-mode :append #'org-auto-tangle-mode)
)
```

## ob-mermaid

_Tangles to ~/.config/doom/packages.el_

```lisp
(package! ob-mermaid)
```

```lisp
(after! ob-mermaid
  :config
  (setq ob-mermaid-cli-path "/usr/bin/mmdc"))

(org-babel-do-load-languages
    'org-babel-load-languages
    '((mermaid . t)
      (scheme . t)))
```

### Mermaid configuration

Some diagrams need this config for text to appear within them

_Tangles to ~/.config/mermaid/config.json_

```json
{
  "flowchart": {
    "htmlLabels": false
  }
}
```

## org-roam-ui

_Tangles to ~/.config/doom/packages.el_

```lisp
(unpin! org-roam)
(package! org-roam-ui)
```

```lisp
(use-package! websocket
    :after org-roam)

(use-package! org-roam-ui
    :after org-roam ;; or :after org
;;         normally we'd recommend hooking orui after org-roam, but since org-roam does not have
;;         a hookable mode anymore, you're advised to pick something yourself
;;         if you don't care about startup time, use
;;    :hook (after-init . org-roam-ui-mode)
    :config
    (setq org-roam-ui-sync-theme t
          org-roam-ui-follow t
          org-roam-ui-update-on-save t
          org-roam-ui-open-on-start t))
```

# Languages

## Astro

Support for `astro-ls`{.verbatim} found in a github issue for lsp-mode.

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
