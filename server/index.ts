// server.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve((_req: any) => new Response("Hello from Deno Server!"), { port: 8000 });
console.log("Server running on http://localhost:8000/");
