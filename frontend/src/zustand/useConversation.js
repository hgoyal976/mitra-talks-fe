import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  createdConversationId: null,
  setCreatedConversationId: (createdConversationId) =>
    set({ createdConversationId }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
