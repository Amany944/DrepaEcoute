import { create } from 'zustand';
import { conversations as seedConversations, doctors as seedDoctors } from '../data/mock';
const uid = () => Math.random().toString(36).slice(2, 9);
export const useAppStore = create((set, get) => ({
    authenticated: false,
    demoMode: false,
    conversations: seedConversations,
    doctors: seedDoctors,
    draft: null,
    toasts: [],
    shareConsent: true,
    researchConsent: false,
    login: (demo = false) => set({ authenticated: true, demoMode: demo }),
    logout: () => set({ authenticated: false, demoMode: false, draft: null }),
    pushToast: (message, icon = 'info', tone = 'info') => {
        const id = uid();
        set((state) => ({ toasts: [...state.toasts, { id, message, icon, tone }] }));
        window.setTimeout(() => get().dismissToast(id), 4200);
    },
    dismissToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
    startDraft: (patientWords, aiSummary, tags) => set({ draft: { patientWords, aiSummary, tags } }),
    clearDraft: () => set({ draft: null }),
    confirmDraft: (share) => {
        const draft = get().draft;
        const now = new Date();
        const conversation = {
            id: `c-${uid()}`,
            date: now.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }),
            time: now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            title: draft?.tags[0] ? `Point d’écoute — ${draft.tags[0]}` : 'Point d’écoute quotidien',
            excerpt: draft?.aiSummary ?? 'Nouveau résumé confirmé.',
            status: share ? 'partagé' : 'confirmé',
            tags: draft?.tags ?? [],
            patientWords: draft?.patientWords ?? '',
            aiSummary: draft?.aiSummary ?? '',
            doctor: share ? 'Dr. Aïssatou Traoré' : 'Non partagé',
        };
        set((state) => ({
            conversations: [conversation, ...state.conversations],
            draft: null,
        }));
        return conversation;
    },
    toggleDoctor: (id) => set((state) => ({
        doctors: state.doctors.map((d) => (d.id === id ? { ...d, active: !d.active } : d)),
    })),
    setShareConsent: (value) => set({ shareConsent: value }),
    setResearchConsent: (value) => set({ researchConsent: value }),
}));
