import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { PatientHeader, PatientShell } from '../components/layout/PatientShell';
import { Icon } from '../components/ui/Icon';
import { useAppStore } from '../store/useAppStore';
import { cn } from '../lib/utils';
const filters = [
    { key: 'tous', label: 'Tous' },
    { key: 'confirmé', label: 'Confirmés' },
    { key: 'non confirmé', label: 'Non confirmés' },
    { key: 'partagé', label: 'Partagés' },
];
export default function History() {
    const conversations = useAppStore((s) => s.conversations);
    const [filter, setFilter] = useState('tous');
    const [query, setQuery] = useState('');
    const [openId, setOpenId] = useState(null);
    const counts = useMemo(() => ({
        tous: conversations.length,
        confirmé: conversations.filter((c) => c.status === 'confirmé').length,
        'non confirmé': conversations.filter((c) => c.status === 'non confirmé').length,
        partagé: conversations.filter((c) => c.status === 'partagé').length,
    }), [conversations]);
    const filtered = conversations.filter((c) => {
        const matchesFilter = filter === 'tous' || c.status === filter;
        const matchesQuery = query.trim().length === 0 ||
            `${c.title} ${c.excerpt} ${c.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase());
        return matchesFilter && matchesQuery;
    });
    return (<PatientShell>
      <PatientHeader title="Historique personnel" subtitle="Vos récits, synthèses et échanges passés" backTo="/accueil"/>
      <main className="flex flex-1 flex-col gap-4 px-4 pb-8 pt-4">
        <div className="relative">
          <Icon name="search" size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant"/>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher un symptôme, une date, un mot-clé…" className="h-12 w-full rounded-xl border border-transparent bg-surface-container-low pl-11 pr-10 text-[13px] outline-none transition placeholder:text-outline focus:border-secondary/30 focus:bg-white"/>
          {query && (<button type="button" onClick={() => setQuery('')} aria-label="Effacer la recherche" className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container">
              <Icon name="close" size={18}/>
            </button>)}
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {filters.map((item) => (<button key={item.key} type="button" onClick={() => setFilter(item.key)} className={cn('shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition', filter === item.key
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container')}>
              {item.label} ({counts[item.key]})
            </button>))}
        </div>

        <div className="flex items-start gap-2.5 rounded-xl bg-secondary-fixed/25 p-3">
          <Icon name="favorite" size={18} className="mt-0.5 shrink-0 text-secondary"/>
          <p className="text-[11px] leading-relaxed text-on-secondary-fixed-variant">
            <strong className="text-on-secondary-fixed">Rythme bienveillant :</strong> l’absence d’enregistrement un
            jour donné ne signifie pas une absence de symptômes. Vous enregistrez à votre propre rythme.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          {filtered.length === 0 && (<div className="flex flex-col items-center gap-2 rounded-2xl bg-surface-container-lowest p-8 text-center shadow-sm">
              <Icon name="search_off" size={32} className="text-outline"/>
              <p className="text-[13px] font-semibold text-primary">Aucun résultat</p>
              <p className="text-[11px] text-on-surface-variant">Essayez un autre mot-clé ou un autre filtre.</p>
            </div>)}

          {filtered.map((conversation) => {
            const open = openId === conversation.id;
            return (<div key={conversation.id} className="overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm">
                <button type="button" onClick={() => setOpenId(open ? null : conversation.id)} aria-expanded={open} className="flex w-full items-start justify-between gap-3 p-3.5 text-left transition hover:bg-surface-container-low/60">
                  <div className="flex min-w-0 gap-3">
                    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-surface-container text-primary">
                      <Icon name="calendar_today" size={14} className="text-on-surface-variant"/>
                      <span className="mt-0.5 font-display text-[13px] font-bold leading-none">
                        {conversation.date.split(' ')[0]}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold leading-snug text-primary">{conversation.title}</p>
                      <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-on-surface-variant">
                        {conversation.excerpt}
                      </p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] text-outline">
                          {conversation.date} · {conversation.time}
                        </span>
                        {conversation.status === 'partagé' && (<span className="flex items-center gap-0.5 text-[9px] font-semibold text-secondary">
                            <Icon name="share" size={11}/> Partagé
                          </span>)}
                      </div>
                    </div>
                  </div>
                  <span className="flex shrink-0 flex-col items-end gap-1.5">
                    <span className={cn('flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[9px] font-semibold', conversation.status === 'confirmé' && 'bg-surface-container-high text-primary', conversation.status === 'non confirmé' && 'bg-surface-container text-on-surface-variant', conversation.status === 'partagé' && 'bg-secondary-fixed text-secondary')}>
                      {conversation.status === 'confirmé' && <Icon name="verified" size={11}/>}
                      {conversation.status}
                    </span>
                    <Icon name="expand_more" size={20} className={cn('text-outline transition-transform', open && 'rotate-180')}/>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                      <div className="space-y-2.5 border-t border-surface-container px-3.5 pb-3.5 pt-3">
                        <div className="flex flex-wrap gap-1.5">
                          {conversation.tags.map((tag) => (<span key={tag} className="rounded-md bg-surface-container-high px-2 py-0.5 text-[10px] font-medium text-on-surface">
                              {tag}
                            </span>))}
                        </div>
                        <div className="rounded-xl bg-surface-container-low p-3">
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-secondary">
                            Votre récit
                          </p>
                          <p className="mt-1 text-[12px] leading-relaxed text-on-surface-variant">
                            « {conversation.patientWords} »
                          </p>
                        </div>
                        <div className="rounded-xl bg-surface-container-low p-3">
                          <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-secondary">
                            <Icon name="psychology" size={13}/> Synthèse clinique
                          </p>
                          <p className="mt-1 text-[12px] leading-relaxed text-on-surface-variant">
                            {conversation.aiSummary}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-0.5">
                          <span className="flex items-center gap-1 text-[10px] text-on-surface-variant">
                            <Icon name={conversation.status === 'partagé' ? 'visibility' : 'lock'} size={13}/>
                            {conversation.status === 'partagé'
                        ? `Visible par ${conversation.doctor}`
                        : 'Privé — non partagé'}
                          </span>
                          <Link to="/confidentialite" className="text-[10px] font-semibold text-secondary hover:underline">
                            Gérer le partage
                          </Link>
                        </div>
                      </div>
                    </motion.div>)}
                </AnimatePresence>
              </div>);
        })}
        </div>

        <p className="mt-1 text-center text-[10px] leading-relaxed text-outline">
          {conversations.length} récits conservés · hébergement HDS · vous pouvez demander leur suppression à tout
          moment.
        </p>
      </main>
    </PatientShell>);
}
