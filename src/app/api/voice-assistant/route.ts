import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Forward the request to the backend voice assistant API
    const response = await fetch('http://localhost:8080/api/stt/voice-assistant', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Backend server error (${response.status}):`, errorText)
      throw new Error(`Backend server responded with status: ${response.status}`)
    }

    // Get the audio response as blob
    const audioData = await response.blob()

    // Return the audio file with appropriate headers
    return new NextResponse(audioData, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('Voice assistant API error:', error)
    return NextResponse.json(
      { error: 'Failed to process voice request' },
      { status: 500 }
    )
  }
}