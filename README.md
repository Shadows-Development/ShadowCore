# ShadowCore v2.0.0 (Development Branch)

> ⚠️ **This is the actively developed v2.0.0 branch of ShadowCore.**  
> It is **unstable**, **experimental**, and **subject to rapid changes** until an official release is tagged.  
>  
> If you're looking for the stable version, see the [`main`](https://github.com/Shadows-Development/ShadowCore/tree/main) branch.

---

## 🧭 What Is ShadowCore v2.0.0?

ShadowCore v2.0.0 is a **modular, security-first TypeScript framework** built for:

- 🔗 **Discord bots** (retaining all v1 functionality and structure)
- 🧠 **NestJS APIs** (modular `@Modules`, injectable services, guards, etc.)
- ⚙️ **CLI tools** (command scaffolding + plugin-ready runtime)
- 🔐 **Reusable security primitives** (`argon2`, `jwt`, `hmac`, etc.)

Unlike v1.x, this version is designed for **multi-platform extensibility**, **runtime plugin support**, and **clean separation of platform logic** — while retaining developer control and performance.

---

## ✅ v2.0.0 Progress Checklist

> Progress tracked across internal PRs, commits, and linked issues.

### 🔧 Core Framework & Utilities
- [x] Base monorepo-ready structure
- [x] Internal module exports (`security`, `utils`, `types`)
- [x] Security utilities (argon2, jwt, hmac)
- [ ] Task scheduler + queue interface redesign

### 🧩 Discord Framework
- [x] Command/Event/Button/Menu support migrated from v1
- [x] Internal middleware system
- [x] Cooldowns, permission checks
- [ ] Plugin support (dynamic injection)
- [ ] Role-based guards overhaul

### 🧠 NestJS Integration (API Layer)
- [x] JWT module wrapper with `JwtModule.registerAsync`
- [x] `AuthService`, `HashService`, `TokenService`
- [ ] Global guards (`RolesGuard`, `RateLimitGuard`)
- [ ] Nest-style decorators (`@Public()`, `@ApiKey()`)
- [ ] Zod-based input validation pipes
- [ ] API key generation + verification service
- [ ] OAuth support layer (optional)

### ⚙️ CLI Toolkit
- [x] Command-line entry point
- [ ] Subcommand loader (auto-discovery)
- [ ] Plugin-aware command scaffolding

### 📚 Documentation & Tooling
- [x] README updates (core + v2.0.0)
- [ ] Migration guide: v1 → v2
- [ ] Docs branding and restructuring
- [ ] Plugin authoring guide
- [ ] NestJS integration examples

---

## 📁 Project Structure (WIP)

```txt
core/
├── discord/       # Discord command/event/button system
├── nest/          # Injectable modules and guards for NestJS
├── cli/           # CLI scaffolding
├── security/      # Auth, hashing, tokens, HMAC
├── utils/         # Generic shared utilities
├── types/         # Global interfaces and enums
└── index.ts       # Package entry
```

---

## 🚧 Status

ShadowCore v2.0.0 is still under **active development** and not ready for production use.  
Tracking branches may include:

- `v2.0.0`
- `v2.0.0-discord`
- `v2.0.0-security`
- `v2.0.0-nest`
- `v2.0.0-cli`

---

## 📌 Release Timeline

- ⏳ No ETA yet
- 🧪 First beta expected once the plugin system and NestJS layer stabilize
- 📘 Docs will ship alongside the first tagged pre-release

---

## 🧪 How to Test It

```bash
git clone https://github.com/Shadows-Development/ShadowCore.git
cd ShadowCore
git checkout v2.0.0

npm install
npm run dev
```

Use `npm link` or `pnpm link` to consume it in a NestJS or bot project during development.

---

## 🧩 Contributing to v2.0.0

You're welcome to help shape v2.0.0!  
Please open an issue or discussion before submitting PRs — the structure is still evolving.

---

## 📜 License

ShadowCore is licensed under the **GNU General Public License v3.0**.  
See the [LICENSE](../LICENSE) file for full terms.
