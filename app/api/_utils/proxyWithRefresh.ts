import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ParsedBody =
  | { kind: "json"; data: unknown }
  | { kind: "text"; text: string };

type ProxyOpts = {
  method: "POST" | "PATCH";
  backendPath: string; // "/tools" або `/tools/${id}`
  body: FormData;
  incomingCookie: string; // req.headers.get("cookie") ?? ""
};

function parseCookieHeader(cookieHeader: string): Record<string, string> {
  const map: Record<string, string> = {};
  cookieHeader
    .split(";")
    .map((p) => p.trim())
    .filter(Boolean)
    .forEach((part) => {
      const idx = part.indexOf("=");
      if (idx === -1) return;
      const k = part.slice(0, idx).trim();
      const v = part.slice(idx + 1).trim();
      map[k] = v;
    });
  return map;
}

function extractCookiesFromSetCookie(
  setCookieHeaders: string[]
): Record<string, string> {
  // беремо тільки "name=value" до першого ';'
  const map: Record<string, string> = {};
  for (const h of setCookieHeaders) {
    const nv = h.split(";")[0];
    const idx = nv.indexOf("=");
    if (idx === -1) continue;
    const name = nv.slice(0, idx).trim();
    const value = nv.slice(idx + 1).trim();
    map[name] = value;
  }
  return map;
}

function mergeCookieHeader(
  original: string,
  setCookieHeaders: string[]
): string {
  const base = parseCookieHeader(original);
  const updated = extractCookiesFromSetCookie(setCookieHeaders);
  const merged = { ...base, ...updated };

  return Object.entries(merged)
    .map(([k, v]) => `${k}=${v}`)
    .join("; ");
}

async function readBackendResponse(res: Response): Promise<ParsedBody> {
  const text = await res.text();
  try {
    const data: unknown = text ? JSON.parse(text) : null;
    return { kind: "json", data };
  } catch {
    return { kind: "text", text };
  }
}

function getErrorMessage(body: unknown): string | undefined {
  if (!body || typeof body !== "object") return;
  const rec = body as Record<string, unknown>;
  const msg = rec.error ?? rec.message;
  return typeof msg === "string" ? msg : undefined;
}

function isAuthExpired(status: number, body: unknown): boolean {
  if (status === 401) return true;
  const msg = getErrorMessage(body);
  return Boolean(msg && msg.toLowerCase().includes("missing access token"));
}

function toJsonPayload(parsed: ParsedBody): unknown {
  return parsed.kind === "json" ? parsed.data : { raw: parsed.text };
}

function clearAuthCookies(res: Response) {
  res.headers.append("Set-Cookie", "accessToken=; Path=/; Max-Age=0");
  res.headers.append("Set-Cookie", "refreshToken=; Path=/; Max-Age=0");
  res.headers.append("Set-Cookie", "sessionId=; Path=/; Max-Age=0");
}

async function refreshSession(
  cookieHeader: string
): Promise<{ ok: boolean; setCookieHeaders: string[] }> {
  if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not set");

  const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: { Cookie: cookieHeader },
  });

  const maybeHeaders = refreshRes.headers as unknown as {
    getSetCookie?: () => string[];
  };
  const setCookiesFromMethod =
    typeof maybeHeaders.getSetCookie === "function"
      ? maybeHeaders.getSetCookie()
      : [];

  const fallback = refreshRes.headers.get("set-cookie");
  const setCookieHeaders = setCookiesFromMethod.length
    ? setCookiesFromMethod
    : fallback
    ? [fallback]
    : [];

  return { ok: refreshRes.ok, setCookieHeaders };
}

export async function proxyFormDataWithRefresh(
  opts: ProxyOpts
): Promise<Response> {
  if (!API_URL) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_API_URL is not set" },
      { status: 500 }
    );
  }

  const url = `${API_URL}${opts.backendPath}`;

  const doRequest = async (cookieHeader: string) => {
    const res = await fetch(url, {
      method: opts.method,
      body: opts.body,
      headers: { Cookie: cookieHeader },
    });
    const parsed = await readBackendResponse(res);
    return { res, parsed };
  };

  // 1) перша спроба
  const attempt1 = await doRequest(opts.incomingCookie);
  const body1 = attempt1.parsed.kind === "json" ? attempt1.parsed.data : null;

  if (!isAuthExpired(attempt1.res.status, body1)) {
    return NextResponse.json(toJsonPayload(attempt1.parsed), {
      status: attempt1.res.status,
    });
  }

  // 2) refresh
  const refreshed = await refreshSession(opts.incomingCookie);

  if (!refreshed.ok || refreshed.setCookieHeaders.length === 0) {
    const out: Response = NextResponse.json(
      { error: "Session expired. Please login again." },
      { status: 401 }
    );
    clearAuthCookies(out);
    return out;
  }

  // 3) повтор з оновленим Cookie
  const mergedCookie = mergeCookieHeader(
    opts.incomingCookie,
    refreshed.setCookieHeaders
  );
  const attempt2 = await doRequest(mergedCookie);

  const out: Response = NextResponse.json(toJsonPayload(attempt2.parsed), {
    status: attempt2.res.status,
  });

  // 4) прокидаємо нові cookies в браузер (access/refresh/sessionId)
  for (const c of refreshed.setCookieHeaders) {
    out.headers.append("Set-Cookie", c);
  }

  return out;
}
