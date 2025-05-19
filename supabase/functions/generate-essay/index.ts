import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface EssayParams {
  topic: string;
  type: string;
  tone: string;
  length: string;
  academicLevel: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, type, tone, length, academicLevel }: EssayParams = await req.json();

    // Here we would integrate with an actual AI service
    // For now, we'll return a structured mock response
    const essay = generateMockEssay(topic, type, tone, length, academicLevel);

    return new Response(
      JSON.stringify({ essay }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
});

function generateMockEssay(topic: string, type: string, tone: string, length: string, academicLevel: string): string {
  const intro = `This ${type} essay explores ${topic} from a ${academicLevel} perspective.`;
  const body = `The impact of ${topic} has been widely studied in recent years. Research shows significant developments in this area.`;
  const conclusion = `In conclusion, ${topic} remains a critical area of study that warrants further investigation.`;

  return `${intro}\n\n${body}\n\n${conclusion}`;
}