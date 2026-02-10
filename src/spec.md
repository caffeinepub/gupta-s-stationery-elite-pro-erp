# Specification

## Summary
**Goal:** Add a simple password-only login gate (no Internet Identity) that blocks access to the ERP until the correct password is entered, with a logout option.

**Planned changes:**
- Add an initial login screen that requires entering the exact password "gupta123" before showing the main ERP UI.
- Show an English error message on incorrect password and keep the user on the login screen.
- Persist authenticated state for the current browser tab session so a refresh in the same tab stays logged in.
- Add a visible logout control inside the ERP UI that clears the session auth state and returns to the login screen.
- Ensure existing Inventory and Billing Station features continue working unchanged, including existing localStorage keys and stored data formats ("g_inv", "g_sales_v10", "g_p").

**User-visible outcome:** Users must enter "gupta123" to access the ERP, can log out to return to the login screen, and all existing Inventory/Billing behavior and saved data remain unchanged.
