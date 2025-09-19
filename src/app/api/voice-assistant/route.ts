import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    console.log('Forwarding request to backend...')

    // Forward the request to the backend voice assistant API
    const response = await fetch('http://localhost:8080/api/stt/voice-assistant', {
      method: 'POST',
      body: formData,
    })

    console.log('Backend response status:', response.status)
    console.log('Backend response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Backend server error (${response.status}):`, errorText)

      // Parse error message if it's JSON
      let errorMessage = `서버 오류: ${response.status}`
      try {
        const errorJson = JSON.parse(errorText)
        if (errorJson.message) {
          // Extract user-friendly message
          if (errorJson.message.includes('음성에서 텍스트를 추출할 수 없습니다')) {
            errorMessage = '녹음된 음성이 너무 짧거나 명확하지 않습니다. 다시 녹음해주세요.'
          } else {
            errorMessage = errorJson.message
          }
        }
      } catch {
        // If not JSON, use the raw error text
        errorMessage = errorText || `서버 오류: ${response.status}`
      }

      // Return error as JSON with appropriate status (not 500, but the actual error status)
      return NextResponse.json(
        { error: errorMessage, status: response.status },
        { status: response.status }
      )
    }

    // Check Content-Type to determine response format
    const contentType = response.headers.get('content-type')
    console.log('Response Content-Type:', contentType)

    if (contentType?.includes('application/json')) {
      // Handle JSON response (new format)
      const jsonData = await response.json()
      console.log('Received JSON response with keys:', Object.keys(jsonData))

      return NextResponse.json(jsonData, {
        status: 200,
        headers: {
          'Cache-Control': 'no-cache',
        },
      })
    } else {
      // Handle audio response (backward compatibility)
      console.log('Handling audio response, converting to expected JSON format...')
      const audioData = await response.blob()

      // Convert audio blob to base64
      const arrayBuffer = await audioData.arrayBuffer()
      const base64Audio = Buffer.from(arrayBuffer).toString('base64')

      // Return in expected JSON format with default text
      const jsonResponse = {
        audioData: base64Audio,
        sttResult: {
          transcribedText: '음성 입력',
          confidence: 0.9,
          language: 'ko-KR'
        },
        llmResponse: {
          message: 'AI 응답',
          model: 'gpt-3.5-turbo'
        },
        processingTimeMs: 2000,
        timestamp: new Date().toISOString()
      }

      return NextResponse.json(jsonResponse, {
        status: 200,
        headers: {
          'Cache-Control': 'no-cache',
        },
      })
    }
  } catch (error) {
    console.error('Voice assistant API error details:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')

    return NextResponse.json(
      { error: 'Failed to process voice request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}