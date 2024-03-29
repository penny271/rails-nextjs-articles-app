// next/src/pages/api/health_check.ts
// API Routes の機能を利用して、本番環境にデプロイした際の疎通確認として使用するヘルスチェック機能を実装

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ status: 'ok!' }));
}
