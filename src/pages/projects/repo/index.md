# Repo

This is a program written in Rust to manage a directory filled with git repositories.
You can view its source code on [GitHub](https://github.com/hegde-atri/repo).

This project is still incomplete and on-going. Progress can feel slow sometimes since
I also need to keep up university :P.

# Preface

I did this to manage all the repos I work on. I usually have a `repositories` folder into
which I have directories(some nested even) into which I clone and organise all my git repositories

Sometimes I work in and out of repositories and don't know whether I have any pending changes to commit. I thought it'd be really helpful if I had a tool to do this for me. Discover all the git repositories recursively from a folder and gimme an overview of what projects have un-pushed commits, staged but uncommited changes and so on.

> This is my first "proper" CLI tool built using rust. So it may be rough around the edges, so if you have any tips, do let me know!

# Requirements

- [ ] Recursively find git repositories.
- [ ] Option to stage all changes in all repositories
  - [ ] or chosen repositories
- [ ] Option to commit all staged changes in all repositories
  - [ ] or chosen repositories
- [ ] Option to push all un-pushed changes in all repositories
  - [ ] or chosen repositories
- [ ] Add a config file, to specify default directory to search for git repositories.
