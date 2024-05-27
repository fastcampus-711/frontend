"use client"

import { useState } from "react"

interface SpeechRecognitionResult {
  readonly isFinal: boolean
  readonly length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number
  readonly results: SpeechRecognitionResultList
  readonly interpretation: any
  readonly emma: Document | null
}

interface SpeechRecognitionError extends Event {
  readonly error: SpeechRecognitionErrorCode
  readonly message: string
}

declare var SpeechRecognitionEvent: {
  prototype: SpeechRecognitionEvent
  new (
    type: string,
    eventInitDict?: SpeechRecognitionEventInit
  ): SpeechRecognitionEvent
}

type SpeechRecognitionErrorCode =
  | "no-speech"
  | "aborted"
  | "audio-capture"
  | "network"
  | "not-allowed"
  | "service-not-allowed"
  | "bad-grammar"
  | "language-not-supported"

interface SpeechRecognitionEventInit extends EventInit {
  resultIndex?: number
  results?: SpeechRecognitionResultList
}

// SpeechRecognitionResult, SpeechRecognitionEvent, SpeechRecognitionError 타입 정의 생략

declare var SpeechRecognitionEvent: {
  prototype: SpeechRecognitionEvent
  new (
    type: string,
    eventInitDict?: SpeechRecognitionEventInit
  ): SpeechRecognitionEvent
}

const VoiceSearch = () => {
  const [transcript, setTranscript] = useState("")
  const [listening, setListening] = useState(false)

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.lang = "ko-KR" // 한국어 설정
      recognition.interimResults = false // 최종 결과만 받기

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        // 매개변수 형식 지정
        const transcript = event.results[0][0].transcript // 인식된 텍스트
        setTranscript(transcript)
      }

      recognition.onend = () => {
        setListening(false)
      }

      recognition.onerror = (event: SpeechRecognitionError) => {
        // 매개변수 형식 지정
        console.error("Speech recognition error", event.error)
        setTranscript("")
      }

      recognition.start() // 음성 인식 시작
      setListening(true)
    } else {
      console.log("Speech recognition not supported in this browser.")
    }
  }

  const stopListening = () => {
    setListening(false)
  }

  const search = () => {
    alert("Searching: " + transcript)
    setTranscript("")
  }

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder={listening ? "Listening..." : "Speak now"}
        value={transcript}
        onChange={e => setTranscript(e.target.value)}
      />
      <div
        className="mic-icon"
        onClick={listening ? stopListening : startListening}
        style={{
          cursor: "pointer",
          backgroundImage:
            'url("https://icons.iconarchive.com/icons/google/noto-emoji-objects/256/62887-studio-microphone-icon.png")',
          backgroundSize: "cover",
          width: "32px",
          height: "32px"
        }}></div>
      <button onClick={search}>Search</button>
    </div>
  )
}

export default VoiceSearch
