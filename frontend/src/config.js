// URLs configurables por entorno (Vite expone solo variables que empiezan con VITE_)
// En local se usan los valores por defecto; en producción se definen en el panel del hosting.
export const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000/api").replace(/\/$/, "");

export const N8N_WEBHOOK_URL =
    import.meta.env.VITE_N8N_WEBHOOK_URL ||
    "http://localhost:5678/webhook/dfff64e4-9189-477f-91c1-61a901a87dd6";
