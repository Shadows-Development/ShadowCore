# ShadowCore Dev Stream Checklist – v1.2.x Fix & Private Bot 🛠️

## 🔧 Phase 1 – ShadowCore Framework Fixes

### Core Fixes
- [ ] Fix `GatewayIntentBits` to allow bots to connect
- [ ] Refactor module registration logic for:
    - [ ] Commands
    - [ ] Events
    - [ ] Buttons
    - [ ] Menus

### Dev Quality
- [ ] Fix startup logs, e.g.:  
  `✅ Loaded X commands, Y events, Z buttons, W menus`
- [ ] Add `DEV_MODE` toggle via `.env` for verbose logs - `Maybe`
- [ ] Standardize handler signatures & structures (`(client, interaction)` etc.)
- [ ] Add fallback error handling for missing or invalid handlers

### 🔁 Hot Reloading
- [ ] Implement a `/reload` command that:
    - Clears cache for all modules
    - Reruns registration for commands, events, buttons, menus
    - Responds with a success or error message
    - `This will be added to the cli init command`
- [ ] Ensure all `registerX()` functions are idempotent

---

## 🤖 Phase 2 – Private ShadowCore Bot (LLC Discord)

### Bot Bootstrapping
- [ ] Create `src/bot.ts` (or `index.ts`) to initialize ShadowCore
- [ ] Add `.env` with `TOKEN`, `DEV_MODE`, and optional `OWNER_ID`
- [ ] Confirm bot logs in and initializes framework successfully

### Initial Commands & Features
- [ ] `/debug ping` – confirm bot is alive
- [ ] `/whoami` – echo user ID, username, roles
- [ ] `/staff` – list LLC staff roles or useful links
- [ ] Add a test menu or button interaction to confirm registration

### Internal-Only Enhancements
- [ ] Restrict `/reload` and admin tools via `OWNER_ID`
- [ ] Implement embed-style helper for brand consistency
- [ ] Add internal error logging for bot failures (optionally to a private channel)
