"use client";

import { useChat } from "ai/react";
import { useState, useRef, useEffect } from "react";
import { X, Send, Bot } from "lucide-react";
import { useLanguage } from "../app/LanguageContext";

export function AIChatWidget() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: "/api/chat",
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show prompt bubble after 2 seconds
    const timer = setTimeout(() => setShowBubble(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Pop-up bubble */}
      {!isOpen && showBubble && (
        <div className="relative animate-bounce bg-panel-bg px-4 py-2 text-sm text-foreground shadow-lg rounded-2xl border border-border">
          {t({ zh: "你好！关于我的履历，随便问！👋", en: "Hi! Ask me anything about my resume! 👋" })}
          <button 
            onClick={() => setShowBubble(false)}
            className="absolute -top-2 -right-2 bg-gray-200 text-gray-600 rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-gray-300"
          >
            ×
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="flex h-[450px] w-80 sm:w-96 flex-col overflow-hidden rounded-2xl bg-panel-bg shadow-2xl border border-border transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between border-b bg-panel-bg px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="bg-btn-bg p-2 rounded-full">
                <Bot size={20} className="text-btn-text" />
              </div>
              <span className="font-semibold text-foreground">{t({ zh: "小U - AI助理", en: "AI Assistant" })}</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-foreground opacity-60 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.length === 0 && (
              <div className="flex flex-col gap-3 mt-4">
                <div className="text-center text-gray-500 text-sm mb-2">
                  <p>{t({ zh: "你可以直接问我关于雨卿的任何问题，例如：", en: "Feel free to ask about my experience, skills, or anything else!" })}</p>
                </div>
                {[
                  { zh: "用一句话概括雨卿的核心优势？", en: "What is Yuki's core advantage?" },
                  { zh: "联通项目中，雨卿是如何让转化率拉升的？", en: "How did Yuki increase the conversion rate in the Unicom project?" },
                  { zh: "为什么简历里提到探索 vibeCoding？", en: "Why mention exploring vibeCoding?" }
                ].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => append({ role: 'user', content: t(q) })}
                    className="text-left bg-white border border-border hover:bg-gray-100 text-foreground text-sm py-2 px-3 rounded-xl transition-colors shadow-sm"
                  >
                    {t(q)}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-btn-bg text-btn-text rounded-br-none"
                      : "bg-gray-200 text-black rounded-bl-none"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-black rounded-2xl rounded-bl-none px-4 py-2 text-sm animate-pulse">
                  {t({ zh: "正在输入...", en: "Typing..." })}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t bg-panel-bg p-3 flex gap-2 items-center"
          >
            <input
              value={input}
              onChange={handleInputChange}
              placeholder={t({ zh: "输入你的问题...", en: "Type your message..." })}
              className="flex-1 rounded-full border border-border bg-panel-bg text-foreground px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-btn-bg"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-full bg-btn-bg p-2 transition-colors hover:opacity-80 disabled:opacity-50"
            >
              <Send size={18} className="text-btn-text" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setShowBubble(false);
          }}
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-btn-bg text-btn-text shadow-xl hover:scale-105 hover:opacity-80 transition-all duration-300"
        >
          <Bot size={28} className="transition-transform group-hover:rotate-12 text-btn-text" />
        </button>
      )}
    </div>
  );
}
