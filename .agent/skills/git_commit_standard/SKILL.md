---
name: Git Commit Standard (Best Practices)
description: Mandatory guide for generating professional Git commit messages in English using the 'git commit -m' syntax with detailed body bullets.
---

# Git Commit Standardization Rule

**STATUS: MANDATORY FOR COMMITS**

This guide provides the strict rules for generating professional Git commit messages. Whenever you are asked to commit changes, you MUST follow this structure.

## 1. General Principles

- **Language:** All commit messages MUST be written in **English** (mandatory).
- **Format:** The output must be ready to be executed in a terminal using the `git commit -m "..."` syntax.
- **Convention:** Use clear, imperative titles (e.g., "Add feature", "Fix bug") followed by a detailed body for significant changes.

## 2. Structure Requirements

The commit message must follow this exact template:

```bash
git commit -m "Short, Descriptive Title (max 50-70 chars)

- Concise description of the first important change
- Concise description of the second important change
- ..."
```

## 3. Mandatory Steps for the AI

1. **Analyze the changes:** Review the files added, modified, or deleted in the session.
2. **Draft the Title:** Create a summary line using the imperative mood (e.g., "Implement Clientes view" instead of "Implemented...").
3. **Detail the Body:** List the key actions performed using the `-` (hyphen) bullet point character for each important point.
4. **Final Formatting:** Ensure the content length is terminal-friendly and correctly wrapped in double quotes starting with `git commit -m "`.

## 4. Example of a Professional Commit

```bash
git commit -m "Implement Clientes view and SPA navigation

- Created Clientes MVC component (Model, View, Controller)
- Implemented ClientesFactory for dependency injection
- Updated SidebarController to handle /clientes route navigation
- Registered /clientes route in main.js
- Verified build and syntax correctness"
```
