import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../../keystatic.config';

export const dynamic = 'force-dynamic';

let handler: ReturnType<typeof makeRouteHandler> | null = null;

function getHandler() {
  if (!handler) {
    handler = makeRouteHandler({ config });
  }
  return handler;
}

export function GET(req: Request) {
  return getHandler().GET(req);
}

export function POST(req: Request) {
  return getHandler().POST(req);
}
