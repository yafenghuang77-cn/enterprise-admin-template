import { randomBytes } from 'crypto';

interface MockRequest {
  headers: { cookie?: string };
  body?: { name?: unknown; email?: unknown; password?: unknown };
}

interface MockResponse {
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

// Development-only service: all users and sessions are reset when the mock server restarts.
const users = [{ name: '演示用户', email: 'admin@example.com', password: 'admin123' }];

const sessions = new Map<string, string>();
const sessionId = (req: MockRequest) =>
  (req.headers.cookie || '')
    .split(';')
    .map((part: string) => part.trim())
    .find((part: string) => part.startsWith('demo_session='))
    ?.slice('demo_session='.length);
const publicUser = (user: { name: string; email: string }) => ({
  name: user.name,
  email: user.email,
});

export default {
  'POST /api/auth/login': (req: MockRequest, res: MockResponse) => {
    const { email, password } = req.body || {};
    const user = users.find(
      (item) => item.email === String(email).toLowerCase() && item.password === password,
    );
    if (!user) {
      res.json({ success: false, errorMessage: '邮箱或密码不正确，请重试。' });
      return;
    }
    const oldSession = sessionId(req);
    if (oldSession) {
      sessions.delete(oldSession);
    }
    const token = randomBytes(32).toString('hex');
    sessions.set(token, user.email);
    res.setHeader('Set-Cookie', `demo_session=${token}; HttpOnly; SameSite=Lax; Path=/`);
    res.json({ success: true, user: publicUser(user) });
  },
  'GET /api/auth/current': (req: MockRequest, res: MockResponse) => {
    const user = users.find((item) => item.email === sessions.get(sessionId(req) ?? ''));
    res.json({ success: true, user: user ? publicUser(user) : null });
  },
  'POST /api/auth/logout': (req: MockRequest, res: MockResponse) => {
    sessions.delete(sessionId(req) ?? '');
    res.setHeader('Set-Cookie', 'demo_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0');
    res.json({ success: true });
  },
  'POST /api/auth/register': (req: MockRequest, res: MockResponse) => {
    const { name, email, password } = req.body || {};
    const normalizedEmail = String(email || '')
      .trim()
      .toLowerCase();
    if (
      typeof name !== 'string' ||
      !name.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) ||
      typeof password !== 'string' ||
      password.length < 8
    ) {
      res.json({ success: false, errorMessage: '请检查填写的信息。' });
      return;
    }
    if (users.some((item) => item.email === normalizedEmail)) {
      res.json({ success: false, errorMessage: '该邮箱已注册，请直接登录。' });
      return;
    }
    users.push({ name: name.trim(), email: normalizedEmail, password });
    res.json({ success: true });
  },
};
