import 'express-session';

declare module 'express-session' {
  interface SessionData {
    logado: boolean;
    user?: {
      id: string;
      name: string;
      email: string;
      majorId: string;
      // adicione outros campos se necessário
    };
  }
}