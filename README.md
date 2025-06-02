# ShadowCore

> ⚙️ **Upcoming Major Update – ShadowCore v2.0.0 (In Development)**  
> ShadowCore is evolving. While it began as a modular Discord bot framework, v2.0.0 will expand it into a **general-purpose, security-first TypeScript framework**.  
> This includes support for **Express.js APIs**, **CLI tools**, **utility-first development**, and **optional plugin-based architecture** across the entire ShadowDev ecosystem.  
>
> 🟢 **Discord remains a core and permanent feature** — everything you can do today will continue to work, and new improvements are planned as part of the expansion.  
>
> 🔧 Development of v2.0.0 is ongoing in the [`v2.0.0`](https://github.com/Shadows-Development/ShadowCore/tree/v2.0.0) branch (and related `v2.0.0-*` feature branches).  
>
> 🧩 **Note:** The plugin system has been delayed until `v2.1.0` to ensure code quality and stability during the v2.0.0 refactor. It may still be explored in an experimental branch (`v2.1.0-plugins`), but it will not ship as part of `v2.0.0`.  
>
> 🕒 **There is currently no ETA for the v2.0.0 release.** The current stable release (`v1.x.x`) will continue to receive updates and is safe to use in production.

![GitHub issues](https://img.shields.io/github/issues/Shadows-Development/ShadowCore?style=flat-square)  
![GitHub forks](https://img.shields.io/github/forks/Shadows-Development/ShadowCore?style=flat-square)  
![GitHub stars](https://img.shields.io/github/stars/Shadows-Development/ShadowCore?style=flat-square)  
![GitHub license](https://img.shields.io/github/license/Shadows-Development/ShadowCore?style=flat-square)  
![npm version](https://img.shields.io/npm/v/@shadow-dev/core?style=flat-square)

---

## 🏢 Project Ownership Update

Effective **May 28th, 2025**, **ShadowCore is officially developed and maintained under [Shadow Development LLC](https://shadowdevelopment.net)**.  
This update reflects our transition from the informal "Shadow Development" name to a formally recognized legal entity.

> 🔐 This README was updated after the fact to reflect the official LLC formation date.  
> The transition does **not** affect licensing, project goals, or community involvement — only formal ownership.

---


## 📖 Documentation

The full documentation for ShadowCore can be found at:  
➡️ [ShadowCore Documentation](https://docs.shadowdevelopment.net/shadowcore)

> 🛠️ Docs are currently being rebuilt for v2.0.0.  
> A new, versioned site with expanded content and branding is in progress.

---

## 🌟 Features

- 🚀 **Modular Command System** - Auto-loads commands from categorized folders
- 🎛 **Dynamic Button & Menu Handling** - Supports dynamic custom IDs (`feature:action:{id}`)
- 🛠 **Middleware Support** - Allows pre/post-execution logic for commands
- ⏳ **Rate Limiting & Cooldowns** - Prevents spam and abuse
- 🌐 **API Utility with Axios** - Simplifies external API requests
- 📜 **Logging with Loki** - Built-in structured logging
- ⏰ **Task Scheduler** - Run background tasks automatically
- 🔐 **Core Security Utilities** - Includes Argon2 password hashing, JWT, HMAC signing

---

## 🔭 What to Expect in v2.0.0

ShadowCore v2.0.0 is being designed to become a full-fledged, modular TypeScript framework — powering Discord bots, web APIs, CLI tools, and secure utilities.

### ✅ Core Enhancements
- Stronger internal APIs and improved typings
- Clear separation of platform-specific and platform-agnostic features
- First-class plugin injection support (deferred to v2.1.0)

### 🧩 Expanded Use Cases
- ✅ **Discord Bots** — Enhanced structure, guard logic, and plugin hooks
- ✅ **Express.js APIs** — Middleware, validation, JWT auth, and input sanitization
- ✅ **CLI Tools** — Built-in CLI scaffolding and command registration system
- ✅ **Security Libraries** — Reusable primitives for tokens, passwords, and signatures

### 🔐 Security-First Foundation
- Argon2-based password hashing + verification
- JWT access & refresh token signing + validation
- HMAC-based message signing with timing-safe comparisons
- Secure API key + token generation

### 🧱 Plugin Architecture (🚫 Deferred to v2.1.0)
- Plugin discovery and runtime loading will be implemented **after** the v2.0.0 release
- Will support scoped command/event/button injection
- A dedicated branch such as `v2.1.0-plugins` will track its progress

### 📚 New Documentation Site (WIP)
- Versioned docs for v1 and v2
- Use-case-specific guides (Discord, Express, CLI, etc.)
- Full plugin authoring documentation (in v2.1.0)
- Improved search, examples, and theming

> 💡 All development for v2.0.0 is taking place in the [`v2.0.0`](https://github.com/Shadows-Development/ShadowCore/tree/v2.0.0) branch and its sub-branches.  
> ❗ There is no official release date — the upgrade will ship when stable, tested, and fully documented.

---

## 🚀 Getting Started

Check out the [Getting Started Guide](https://docs.shadowdevelopment.net/shadowcore/getting-started) for a step-by-step setup process.

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
- 📣 Follow development via the [v2.0.0 branch](https://github.com/Shadows-Development/ShadowCore/tree/v2.0.0)
