import { GameSession } from '@prisma/client';

export type CreateGameSessionDto = Pick<GameSession, 'userId' | 'score'>;