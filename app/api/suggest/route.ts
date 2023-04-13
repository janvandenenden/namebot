import { NextRequest, NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function POST(req: NextRequest, res: NextResponse) {
  const { prompt, count = 10 } = await req.json()

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are a creative marketing agency with talented brand strategists who like to think outside of the box.',
      },
      {
        role: 'user',
        content: `Generate ${count} creative company names, following the Igor Brand Naming Guide, for the following idea: "${prompt}". Please respond with only the suggested company names. Don't include any other text.`,
      },
    ],
  })

  const message = response.data.choices[0]?.message?.content || ''
  const suggestions = message.split('\n').flatMap((suggestion) => suggestion.match(/\d+. (.*)/)?.[1])

  return NextResponse.json({
    suggestions,
  })
}
