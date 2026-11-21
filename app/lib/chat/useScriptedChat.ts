"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/app/lib/useReducedMotion";
import {
  type Block,
  type Intent,
  greeting,
  intentById,
  matchIntent,
  starterIds,
} from "./knowledge";

export type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  text: string;
  /** Characters revealed so far (assistant messages stream in) */
  shown: number;
  blocks: Block[];
  done: boolean;
  intentId?: string;
};

export type ChatStatus = "idle" | "thinking" | "streaming";

type Options = {
  /** Start with the assistant's greeting already in the thread */
  greet?: boolean;
  /** Delay before the answer starts, in ms */
  thinkingMs?: number;
  /** Opening line, when the assistant has a name of its own */
  greetingText?: string;
};

let nextId = 1;

/**
 * Scripted chat: matches a question to a written answer and streams it in,
 * like a model would. Under reduced motion answers appear at once.
 */
export function useScriptedChat({ greet = true, thinkingMs = 650, greetingText = greeting }: Options = {}) {
  const reduce = useReducedMotion();
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    greet
      ? [
          {
            id: nextId++,
            role: "assistant",
            text: greetingText,
            shown: greetingText.length,
            blocks: [],
            done: true,
          },
        ]
      : [],
  );
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [suggestions, setSuggestions] = useState<Intent[]>(
    () => starterIds.map(intentById).filter(Boolean) as Intent[],
  );
  const timers = useRef<number[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t));
    },
    [],
  );

  const ask = useCallback(
    (question: string, forcedIntentId?: string) => {
      const q = question.trim();
      if (!q || status !== "idle") return;
      const intent = (forcedIntentId && intentById(forcedIntentId)) || matchIntent(q);
      const userMsg: ChatMessage = {
        id: nextId++,
        role: "user",
        text: q,
        shown: q.length,
        blocks: [],
        done: true,
      };
      const answerId = nextId++;
      setMessages((m) => [...m, userMsg]);
      setSuggestions([]);
      setStatus("thinking");

      const finish = () => {
        setMessages((m) => m.map((msg) => (msg.id === answerId ? { ...msg, shown: msg.text.length, done: true } : msg)));
        setStatus("idle");
        setSuggestions(
          (intent.followUps ?? []).map(intentById).filter(Boolean) as Intent[],
        );
      };

      const start = window.setTimeout(
        () => {
          setMessages((m) => [
            ...m,
            {
              id: answerId,
              role: "assistant",
              text: intent.text,
              shown: reduce ? intent.text.length : 0,
              blocks: intent.blocks ?? [],
              done: false,
              intentId: intent.id,
            },
          ]);
          if (reduce) {
            finish();
            return;
          }
          setStatus("streaming");
          // Stream a few characters at a time, with a little irregularity
          let shown = 0;
          const tick = () => {
            shown = Math.min(intent.text.length, shown + 2 + Math.floor(Math.random() * 4));
            setMessages((m) => m.map((msg) => (msg.id === answerId ? { ...msg, shown } : msg)));
            if (shown >= intent.text.length) finish();
            else timers.current.push(window.setTimeout(tick, 18 + Math.random() * 22));
          };
          tick();
        },
        reduce ? 0 : thinkingMs,
      );
      timers.current.push(start);
    },
    [status, reduce, thinkingMs],
  );

  const askIntent = useCallback(
    (intent: Intent) => ask(intent.question, intent.id),
    [ask],
  );

  return { messages, status, suggestions, ask, askIntent, busy: status !== "idle" };
}
