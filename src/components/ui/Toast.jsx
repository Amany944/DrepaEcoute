import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { Icon } from './Icon';
const toneClasses = {
    info: 'bg-inverse-surface text-inverse-on-surface',
    success: 'bg-primary text-on-primary',
    warning: 'bg-tertiary-container text-white',
};
export function Toaster() {
    const toasts = useAppStore((s) => s.toasts);
    const dismiss = useAppStore((s) => s.dismissToast);
    return (<div className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex flex-col items-center gap-2 px-4 sm:bottom-8">
      <AnimatePresence>
        {toasts.map((toast) => (<motion.div key={toast.id} initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} className={`pointer-events-auto flex w-full max-w-md items-center justify-between gap-3 rounded-2xl px-4 py-3 shadow-xl ${toneClasses[toast.tone ?? 'info']}`}>
            <div className="flex items-center gap-2.5">
              <Icon name={toast.icon} size={20} className="text-secondary-fixed"/>
              <span className="text-sm leading-snug">{toast.message}</span>
            </div>
            <button type="button" onClick={() => dismiss(toast.id)} aria-label="Fermer la notification" className="rounded-full p-1 opacity-70 transition hover:opacity-100">
              <Icon name="close" size={16}/>
            </button>
          </motion.div>))}
      </AnimatePresence>
    </div>);
}
