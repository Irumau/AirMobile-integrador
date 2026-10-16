# Despliegue de AirMobile (portafolio)

Arquitectura: **Frontend → Vercel**, **API → Render**, **DB → Turso**, **Bot → n8n Cloud o n8n en Render**, **IA → Groq/Gemini (reemplaza Ollama local)**.

## 1. Base de datos (Turso)
1. `turso db create airmobile` y `turso db tokens create airmobile`.
2. Guardá `TURSO_URL` (libsql://...) y `TURSO_TOKEN`.
3. Cargá datos de ejemplo una vez desde tu PC: con esas variables en `.env`, `npm run dev:seed`.

## 2. API (Render)
1. New → Blueprint → elegí este repo (usa `render.yaml`), o Web Service con build `npm ci --omit=dev` y start `npm start`.
2. Completá las variables (ver `.env.example`). Claves:
   - `FRONTEND_URL` = URL de Vercel (ej. `https://airmobile.vercel.app`)
   - `BACKEND_URL` = URL de Render (ej. `https://airmobile-api.onrender.com`)
   - `MP_ACCESS_TOKEN` = token **de prueba** de Mercado Pago
3. Probá `https://<tu-api>/health` → `{"ok":true}`.
> El plan gratis se duerme tras 15 min sin uso; el primer request tarda ~50 s.

## 3. Frontend (Vercel)
1. Importá el repo. Root directory: raíz del repo (el `vercel.json` ya define build y salida `frontend/dist`).
2. Variables: `VITE_API_URL=https://<tu-api>/api` y `VITE_N8N_WEBHOOK_URL=<webhook de producción de n8n>`.
3. Deploy. Después volvé a Render y confirmá que `FRONTEND_URL` coincide exactamente.

## 4. Mercado Pago
- Usá credenciales de prueba y cuentas de test comprador. Con URLs https públicas, `auto_return` y el webhook (`BACKEND_URL/api/pagos/webhook`) funcionan sin ngrok.

## 5. Bot n8n
- Ollama + qwen3:4b no corre en hostings gratuitos. En el workflow, reemplazá el nodo de chat model de Ollama por **Groq** (gratis, ej. `llama-3.1-8b-instant`) o **Google Gemini**.
- En los nodos HTTP Request de las tools, cambiá `http://localhost:3000` por la URL de Render.
- En `system_promt_email_bot.txt`, cambiá `http://localhost:5173` por la URL de Vercel.
- Activá el workflow y usá la **Production URL** del webhook (no la de test). Configurá CORS del webhook para permitir tu dominio de Vercel.
- Opciones de hosting: n8n Cloud (trial) o n8n en Render con imagen Docker `n8nio/n8n` (el plan gratis pierde datos al reiniciar; exportá el workflow JSON al repo).

## 6. Para el portafolio
- Creá un usuario demo y poné credenciales en el README.
- Grabá un video/GIF corto del flujo de compra y del chat (por si el bot o la API están dormidos).
