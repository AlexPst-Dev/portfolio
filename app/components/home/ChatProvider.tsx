"use client";

import { createContext, use, useCallback, useState } from "react";
import { useScriptedChat } from "@/app/lib/chat/useScriptedChat";

type Chat = ReturnType<typeof useScriptedChat>;

type ChatContext = {
  chat: Chat;
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Opens the conversation and asks a question in it */
  ask: (question: string, intentId?: string) => void;
};

const Context = createContext<ChatContext | null>(null);

const GREETING =
  "Bonjour, je suis l'étincelle, l'assistante d'Alexandre. Posez-moi vos questions sur ses projets, sa méthode ou ce qu'il peut construire pour vous.";

/** The spark's conversation, shared by the companion and every button that opens it. */
export function ChatProvider({ children }: { children: React.ReactNode }) {
  const chat = useScriptedChat({ greetingText: GREETING });
  const [open, setOpen] = useState(false);
  const { ask: chatAsk } = chat;

  const ask = useCallback(
    (question: string, intentId?: string) => {
      setOpen(true);
      chatAsk(question, intentId);
    },
    [chatAsk],
  );

  return <Context value={{ chat, open, setOpen, ask }}>{children}</Context>;
}

export function useChat() {
  const ctx = use(Context);
  if (!ctx) throw new Error("useChat must be used inside <ChatProvider>");
  return ctx;
}

type AskButtonProps = Omit<React.ComponentProps<"button">, "type" | "onClick"> & {
  /** Question to ask on click; without one the button only opens the conversation */
  question?: string;
  intentId?: string;
};

/** A button anywhere on the page that opens the spark's conversation. */
export function AskButton({ question, intentId, children, ...rest }: AskButtonProps) {
  const { ask, setOpen } = useChat();
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => (question ? ask(question, intentId) : setOpen(true))}
      {...rest}
    >
      {children}
    </button>
  );
}
