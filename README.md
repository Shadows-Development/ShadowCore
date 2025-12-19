# ShadowCore

![GitHub issues](https://img.shields.io/github/issues/Shadows-Development/ShadowCore?style=flat-square)
![GitHub forks](https://img.shields.io/github/forks/Shadows-Development/ShadowCore?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/Shadows-Development/ShadowCore?style=flat-square)
![GitHub license](https://img.shields.io/github/license/Shadows-Development/ShadowCore?style=flat-square)
![npm version](https://img.shields.io/npm/v/@shadow-dev/core?style=flat-square)

---

## 🏢 Project Ownership

Effective **May 28th, 2025**, **ShadowCore is officially developed and maintained under [Shadow Development LLC](https://shadowdevelopment.net)**.

This reflects the transition from the informal “Shadow Development” name to a legally registered entity.  
The transition does **not** affect licensing, project goals, or community involvement — only formal ownership.

---

## 📘 Overview

**ShadowCore** is a modular, extensible framework for building large-scale Discord bots with a strong focus on:

- clean architecture
- plugin-driven extensibility
- predictable load order
- execution safety
- long-term maintainability

ShadowCore is designed to scale beyond single-bot projects and supports multi-plugin ecosystems with minimal boilerplate.

---

## 🌟 Core Features

- 🧩 **First-Class Plugin System**  
  Dynamically load commands, buttons, menus, and events from plugins using the same module system as core components.

- ⚙️ **Automatic Component Registration**  
  Core and plugin components share a unified auto-registration pipeline — no manual wiring required.

- 🧠 **Event Bus**  
  Priority-based internal event system for decoupled communication between core systems and plugins.

- 🚀 **Modular Command System**  
  Commands are auto-discovered from categorized folders with built-in middleware support.

- 🎛 **Dynamic Button & Menu Handling**  
  Supports dynamic custom IDs (e.g. `feature:action:{id}`) for scalable interaction handling.

- 🛡 **Execution Isolation**  
  Plugin and command failures are safely contained so one component cannot crash the bot.

- 🛠 **Middleware Pipeline**  
  Pre- and post-execution middleware with deterministic ordering.

- ⏳ **Rate Limiting & Cooldowns**  
  Built-in mechanisms to prevent spam and abuse.

- 🌐 **Utility Modules**  
  Axios-based API helpers, logging utilities, task scheduling, and general helpers.

- 🔐 **Security Utilities**  
  Includes Argon2 password hashing, JWT helpers, and HMAC signing utilities.

---

## 🚀 Getting Started

To get started with ShadowCore, follow the step-by-step setup guide in the documentation:

➡️ **Documentation:**  
https://docs.shadowdevelopment.net/shadowcore

> 🛠️ Documentation is currently being refreshed for ShadowCore v2+.  
> A new, multi-project, versioned documentation site is in progress.

---

## 🧩 Plugin System

ShadowCore includes a built-in plugin system that allows functionality to be developed and distributed independently of the core.

Plugins can provide:
- commands
- buttons
- menus
- events
- background services

Plugin components are automatically discovered and registered at startup, and execution is fully isolated from the core runtime.

Plugin authoring and structure are documented in the official docs.

---

## 🖥️ CLI Tooling

ShadowCore includes a CLI to assist with:
- project scaffolding
- consistent project structure
- future developer tooling

CLI functionality will continue to expand alongside the framework.

---

## 📜 License

This project is licensed under the **GNU General Public License v3.0**.  
See the [LICENSE](LICENSE) file for full terms.

---
## 🤝 Contributing

1. **Fork the repository** on GitHub  
2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/Shadows-Development/ShadowCore.git
   ```
3. **Create a new branch** for your changes:
   ```bash
   git checkout -b feat/new-functionality
   ```
4. **Make changes** and commit them:
   ```bash
   git commit -m "feat: add cool feature"
   ```
5. **Push the branch** and create a pull request:
   ```bash
   git push origin feat/new-functionality
   ```
6. **Submit a pull request** on GitHub and wait for review

---

## 🌎 Community & Support

- 💬 Open a [GitHub Issue](https://github.com/Shadows-Development/ShadowCore/issues) for bugs or feature requests

