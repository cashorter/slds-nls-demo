# Mississippi SLDS AI Search Demo

A lightweight prototype showing how a natural-language interface can sit in front of education data workflows while keeping AI credentials on the server side.

## Why this project matters

The demo explores a simple but important pattern: users ask questions in plain English, the application forwards those questions through a controlled server-side integration, and the browser receives only the resulting answer. The design avoids exposing API credentials in client-side JavaScript.

## Security design

- Gemini API credentials are read from server-side environment variables.
- The browser calls only the local `/api/search` endpoint.
- Requests are rate-limited.
- Request bodies are size-limited and query length is validated.
- Security headers are applied with Helmet.
- Content Security Policy restricts scripts, connections, framing, and object sources.
- AI output is rendered with `textContent` rather than injected as HTML.
- `.env` files and local dependencies are excluded from source control.

## Architecture

```text
Browser
   |
   | POST /api/search
   v
Node / Express server
   |
   | server-side GEMINI_API_KEY
   v
Gemini API
   |
   v
Sanitized text response to browser
```

## Run locally

Requirements: Node.js 18 or newer.

```bash
npm install
cp .env.example .env
```

Add your Gemini API key to `.env`, then run:

```bash
npm start
```

Open `http://localhost:3000`.

## Example questions

- What are the top reasons for student transfers in Mississippi?
- Show me dropout trends since 2019 by region.
- Compare ACT scores across regions since 2019.

## Prototype scope

This repository demonstrates the application and security pattern. It is not connected here to production SLDS datasets, production authentication, or production authorization controls.

## Production hardening path

A production deployment would add authenticated user sessions, role-based authorization, approved data connectors, structured logging, audit trails, secret-manager integration, model-output controls, and automated security testing in CI/CD.

## Focus areas demonstrated

Applied AI · Secure API integration · Server-side secret handling · Web application security · Natural-language interfaces · Security-by-design
