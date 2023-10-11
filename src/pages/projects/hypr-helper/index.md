# hypr-helper 

This is second official rust project.

## Things learnt

- How to build a CLI Tool.
- Writing tests
- Maintaining the application so it doesn't break.
- Writing documentation and publising to docs.rs

# Version 1

- It will return data when requested through the CLI using the command.

## Features

- Workspace information
- Active window title
- EWW - returns eww widget with workspace data.


# Version 2

This is built as a module for status bar that I plan to write. Therefore it is written to be very modular.

- Listens to UNIX socket for changes rather than polling data.

## Features

- 

## Versions

There is two versions, the first one was called `hyprland-workspaces`.

After its development and use for about 4-5 months. I decided I could rewrite it better and more efficient. You can find it here [https://github.com/hegde-atri/hyprland-workspaces](https://github.com/hegde-atri/hyprland-workspaces).

Then I rewrote it to listen to a UNIX socket rather polling data. When I started rewriting it, I decided to:
1. Rename it to avoid confusion with another project. It is now called `hypr-helper`
2. Moved the project from GitHub to Codeberg.

You can visit the repository at [https://codeberg.org/hegde-atri/hypr-helper](https://codeberg.org/hegde-atri/hypr-helper).
