# ShadowCore v2.0.0 (Development Branch)

> ⚠️ **This is the actively developed `v2.0.0` branch of ShadowCore.**  
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
- [x] TaskScheduler refactored to class-based
- [ ] TaskScheduler documentation/tests

### 🧩 Discord Framework
- [x] Command/Event/Button/Menu system
- [x] Middleware + cooldown support
- [x] Role-based guard system (non-Nest)
- [ ] Plugin system (🕓 Deferred — will not ship in v2.0.0, may be developed under `v2.1.0` branch)

### 🧠 NestJS Integration (API Layer)
- [x] TokenService with cookie-based JWT handling
- [x] `JwtAuthGuard`, `RolesGuard`
- [x] `@Roles`, `@CurrentUser` decorators
- [ ] `@Public`, `@ApiKey` decorators
- [ ] Global `RateLimitGuard`
- [ ] Zod-based input validation pipes
- [ ] API key service
- [ ] OAuth support (optional)

### ⚙️ CLI Toolkit
- [x] CLI entrypoint & command handling
- [ ] Plugin-aware CLI scaffolding (🕓 Deferred — tied to plugin system)

### 📚 Documentation & Tooling
- [x] v2.0.0 README and checklist
- [ ] Plugin authoring guide
- [ ] v1 → v2 migration guide
- [ ] NestJS integration examples
- [ ] Docs branding restructure (Mintlify or Docusaurus)

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

## 📌 Plugin System Status

🧩 The **Discord plugin system** and **plugin-aware CLI scaffolding** will **not be included in the v2.0.0 release**.  
While development **may begin during the v2.x cycle**, the feature has been deferred to a **future update (likely v2.1.0)** to ensure focus on the core framework’s quality, stability, and documentation.  
If active work resumes, it will be tracked under a dedicated branch such as `v2.1.0-plugins`.

---

## 🚧 Status

ShadowCore v2.0.0 is under **active development** and not ready for production use.  
Tracking branches may include:

- `v2.0.0`
- `v2.0.0-discord`
- `v2.0.0-security`
- `v2.0.0-nest`
- `v2.0.0-utils`

---

## 📌 Release Timeline

- ⏳ No ETA currently
- 🧪 First beta once NestJS layer and v2 features stabilize
- 📘 Docs will ship alongside the first tagged release candidate

---

## 🧪 How to Test It

```bash
git clone https://github.com/Shadows-Development/ShadowCore.git
cd ShadowCore
git checkout v2.0.0

npm install
npm run dev
```

Use `npm link` or `pnpm link` to test in other projects during development.

---

## 🧩 Contributing to v2.0.0

You're welcome to help shape v2.0.0!  
Please open an issue or discussion before submitting PRs — the structure is still evolving.

---

## 📜 License

ShadowCore is licensed under the **GNU General Public License v3.0**.  
See the [LICENSE](../LICENSE) file for full terms.
