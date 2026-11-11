'use client';

import { ChevronDown } from 'lucide-react';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const questions = [
  {
    "question": "How do I start a conversation?",
    "answer": "Choose Talk to clinic reception and allow microphone access when your browser asks. Speak in English and describe what you need. You can mute the microphone or end the conversation with the voice controls."
  },
  {
    "question": "What should I say?",
    "answer": "Ask a general clinic question or describe an appointment preference without sharing medical records. For example: “What are the example clinic’s opening hours, and how should I prepare to request a routine visit?” You can clarify the type of administrative help you need."
  },
  {
    "question": "Are the clinic and appointment times real?",
    "answer": "Agora Family Clinic and its clinicians are fictional examples. Opening hours and clinician descriptions are configured reference material, not live availability. This demo cannot access patient records or book, reschedule or cancel an appointment."
  },
  {
    "question": "Can I get medical advice or emergency help here?",
    "answer": "This demo provides general clinic information, not diagnosis, prescriptions or test interpretation. For a possible emergency, call 911 or seek emergency care directly. The assistant cannot contact a clinician or emergency service on your behalf."
  },
  {
    "question": "Can I change what I said?",
    "answer": "Yes. Tell the assistant which detail to correct, ask it to repeat or clarify an answer, or request a verbal recap. Details are used within the current conversation; this demo does not save business results or remember them across sessions."
  },
  {
    "question": "What if my microphone does not work?",
    "answer": "Check that microphone access is allowed for this page and that the correct input device is selected in your browser or system settings. Make sure the microphone is not muted, then try Talk to clinic reception again."
  }
];

export function ScenarioFaq() {
  return (
    <DialogContent className="demo-inspector demo-faq-drawer">
      <DialogHeader className="demo-faq-heading">
        <DialogTitle>Frequently asked questions</DialogTitle>
        <DialogDescription>How to get started, what to ask, and what to expect.</DialogDescription>
      </DialogHeader>
      <div className="demo-faq-list">
        {questions.map(({ question, answer }) => (
          <details className="demo-faq-item" key={question}>
            <summary>
              <span>{question}</span>
              <ChevronDown className="demo-faq-chevron" size={16} aria-hidden="true" />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </DialogContent>
  );
}
