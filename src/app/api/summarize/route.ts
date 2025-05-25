import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// API 키 확인
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is not set in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// CORS 설정
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  // CORS 헤더 설정
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // OPTIONS 요청 처리
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { headers });
  }

  try {
    // API 키 확인
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500, headers }
      );
    }

    // 요청 본문 파싱
    const body = await request.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400, headers }
      );
    }

    const { text } = body;
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: '텍스트가 필요합니다.' },
        { status: 400, headers }
      );
    }

    // OpenAI API 호출
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "당신은 텍스트를 간단하고 명확하게 요약하는 전문가입니다. 핵심 내용을 3-4문장으로 요약해주세요."
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const summary = completion.choices[0]?.message?.content;
    if (!summary) {
      return NextResponse.json(
        { error: 'OpenAI API가 응답을 생성하지 못했습니다.' },
        { status: 500, headers }
      );
    }

    return NextResponse.json({ summary }, { headers });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: '서버에서 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 오류'
      },
      { status: 500, headers }
    );
  }
} 