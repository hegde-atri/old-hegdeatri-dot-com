---
title: make help
description: Adding a help recipe to your Makefile
pubDate: 2023-03-27
date: 2023-03-27
slug: make-help
tags:
  - Makefile
  - GNU
---
Adding a help recipe to your Makefile.

```make
help: ## show help message
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m\033[0m\n"} /^[$$()% a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
```
