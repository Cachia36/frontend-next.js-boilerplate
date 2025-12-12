
Next.js Authentication Boilerplate
==================================

A modern, production-ready authentication boilerplate built with **Next.js App Router**, designed to be reusable, secure, and easy to extend for real-world applications.

Next.js (App Router) TypeScript JWT HTTP-only cookies Zod Vitest GitHub Actions Tailwind shadcn/ui

This project focuses on **clean architecture**, **security best practices**, and **testability**, making it suitable both as a starting point for new projects and as a portfolio showcase.

✨ Features
----------

*   **Complete authentication flow**: register, login, logout
*   **Secure password hashing**
*   **Access & refresh token** strategy using HTTP-only cookies
*   **Password reset**: token-based reset with expiration + rate-limited requests
*   **Clean architecture**: domain/services/repositories separated from API routes
*   **Testing**: unit & integration tests for API routes with mocked dependencies
*   **CI-ready**: automated test runs via GitHub Actions
*   **Reusable**: intended as a boilerplate for future full-stack apps

🛠 Tech Stack
-------------

*   **Next.js 14+** (App Router)
*   **TypeScript**
*   **Node.js**
*   **JWT** (access & refresh tokens)
*   **HTTP-only cookies**
*   **Zod** (validation)
*   **Vitest** (testing)
*   **GitHub Actions** (CI)
*   **Tailwind CSS** + **shadcn/ui**

📁 Project Structure
--------------------

    src/
    ├── app/
    │   └── api/
    │       └── auth/        # Auth API routes
    ├── lib/
    │   ├── auth/
    │   │   ├── domain/      # Business logic & validation
    │   │   ├── services/    # Auth services (JWT, password, etc.)
    │   │   └── repositories/# Data access layer
    │   ├── core/            # Errors, logging, rate limiting
    │   └── http/            # API helpers & middleware
    ├── components/
    │   └── auth/            # UI auth components
    └── tests/               # API & service tests

🔒 Security Considerations
--------------------------

*   Passwords are never stored in plain text
*   Tokens are stored in **HTTP-only cookies**
*   Rate limiting is applied to sensitive endpoints
*   Sensitive fields are stripped from public user objects
*   Centralised error handling

🧪 Testing & CI
---------------

*   Tests cover registration, login, password reset, and error scenarios
*   CI pipeline runs tests automatically on push

🚧 Purpose
----------

*   A reusable authentication boilerplate
*   A portfolio project showcasing backend & frontend architecture
*   A foundation for future full-stack applications

📄 License
----------

MIT

Tip: If you want, I can also output a lighter version (white background) for portfolio pages.