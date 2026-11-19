import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProShell } from '../../components/layout/ProShell';
import { Icon } from '../../components/ui/Icon';
import { proPatients } from '../../data/mock';
import { cn } from '../../lib/utils';
export default function ProPatients() {
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('tous');
    const filtered = proPatients.filter((p) => {
        const matchQuery = `${p.name} ${p.id} ${p.genotype}`.toLowerCase().includes(query.toLowerCase());
        const matchFilter = filter === 'tous' || (filter === 'non lus' && p.unread) || (filter === 'à revoir' && p.status === 'À revoir');
        return matchQuery && matchFilter;
    });
    return (<ProShell title="Patients autorisés" subtitle="18 dossiers actifs partagés avec votre carte CPS / RPPS">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Icon name="search" size={19} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant"/>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher un nom, un IPP, un génotype…" className="h-11 w-full rounded-xl border border-surface-container bg-surface-container-lowest pl-10 pr-4 text-[12px] outline-none transition focus:border-secondary/40"/>
          </div>
          <div className="flex gap-1.5">
            {['tous', 'non lus', 'à revoir'].map((item) => (<button key={item} type="button" onClick={() => setFilter(item)} className={cn('rounded-full px-3 py-1.5 text-[11px] font-semibold capitalize transition', filter === item ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant')}>
                {item}
              </button>))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (<Link key={p.id} to={p.id === 'ID-DRP-84920' ? '/pro/patients/ID-DRP-84920' : '/pro/patients'} className="group flex flex-col gap-3 rounded-2xl border border-surface-container bg-surface-container-lowest p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container font-display text-[13px] font-bold text-primary">
                    {p.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-primary">{p.name}</p>
                    <p className="text-[10px] text-on-surface-variant">
                      {p.age} ans · {p.genotype} · {p.id}
                    </p>
                  </div>
                </div>
                {p.unread && <span className="h-2 w-2 rounded-full bg-secondary"/>}
              </div>
              <div className="flex items-center justify-between rounded-xl bg-surface-container-low px-3 py-2">
                <div>
                  <p className="text-[9px] uppercase tracking-wide text-outline">Dernier résumé</p>
                  <p className="text-[11px] font-semibold text-primary">{p.lastSummary}</p>
                </div>
                <span className={cn('rounded-full px-2 py-0.5 text-[9px] font-semibold', p.status === 'À revoir' ? 'bg-error-container text-on-error-container' : 'bg-secondary-fixed text-secondary')}>
                  {p.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <Icon name="verified_user" size={13} className="text-secondary"/> Consentement actif
                </span>
                <span className="flex items-center gap-0.5 font-semibold text-secondary group-hover:underline">
                  Ouvrir le dossier <Icon name="chevron_right" size={14}/>
                </span>
              </div>
            </Link>))}
        </div>

        {filtered.length === 0 && (<div className="rounded-2xl bg-surface-container-lowest p-10 text-center shadow-sm">
            <Icon name="person_search" size={32} className="text-outline"/>
            <p className="mt-2 text-[13px] font-semibold text-primary">Aucun dossier trouvé</p>
          </div>)}

        <p className="text-[10px] text-outline">
          Accès strictement nominatif · chaque ouverture de dossier est journalisée (traçabilité HDS).
        </p>
      </div>
    </ProShell>);
}
