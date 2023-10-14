# hypr-helper 

This is my second official rust project.

## Things learnt

- How to build a CLI Tool.
- Writing tests
- Maintaining the application so it doesn't break.
- Writing documentation and publishing to docs.rs

## Features

- Workspace information
- Active window title
- EWW - returns EWW widget with workspace data.

# Version 1

- It will return data when requested through the CLI using the command.

I polled for data. I felt like this was rather resource intensive.

# Version 2

- Listens to UNIX socket for changes rather than polling data.
- Serialises and de-serialises data.

# Vision

I want to create my own status bar that will be more efficient than EWW, which I am currently using. So this is my start of creating more and more modules that I can later use in the status bar project.

# Testing

I wrote some unit tests in 0.0.5+. You will obviously need Hyprland installed and running for them to pass.

# Versions

There is two versions, the first one was called `hyprland-workspaces`.

After its development and use for about 4-5 months. I decided I could rewrite it better and more efficient. You can find it here [https://github.com/hegde-atri/hyprland-workspaces](https://github.com/hegde-atri/hyprland-workspaces).

Then I rewrote it to listen to a UNIX socket rather polling data. When I started rewriting it, I decided to:
1. Rename it to avoid confusion with another project. It is now called `hypr-helper`
2. Moved the project from GitHub to Codeberg.

You can visit the repository at [https://codeberg.org/hegde-atri/hypr-helper](https://codeberg.org/hegde-atri/hypr-helper).
