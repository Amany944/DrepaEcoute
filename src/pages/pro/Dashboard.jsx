import { Link } from 'react-router-dom';
import { ProShell } from '../../components/layout/ProShell';
import { Icon } from '../../components/ui/Icon';
import { proPatients } from '../../data/mock';
import { useAppStore } from '../../store/useAppStore';
const stats = [
    { label: 'Dossiers actifs', value: '18', trend: '+2 ce mois', icon: 'patient_list', tone: 'bg-primary text-on-primary' },
    { label: 'Résumés non lus', value: '6', trend: 'dont 2 urgents', icon: 'clinical_notes', tone: 'bg-secondary-fixed text-secondary' },
    { label: 'Alertes cliniques', value: '2', trend: 'à qualifier', icon: 'monitor_heart', tone: 'bg-error-container text-on-error-container' },
    { label: 'Consentements', value: '16', trend: 'sur 18 dossiers', icon: 'verified_user', tone: 'bg-surface-container-high text-primary' },
];
export default function ProDashboard() {
    const pushToast = useAppStore((s) => s.pushToast);
    return (<ProShell title="Bonjour Dr. Traoré" subtitle="Service Hématologie & Médecine Interne · CHU Necker">
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-2.5 rounded-xl bg-secondary-fixed/30 px-4 py-3 text-[12px] text-on-secondary-fixed-variant">
          <Icon name="verified_user" size={18} className="mt-0.5 shrink-0 text-secondary"/>
          <p>
            Session <strong className="text-on-secondary-fixed">e-CPS / Pro Santé Connect</strong> active. Toutes les
            consultations sont tracées et conformes au secret médical partagé.
          </p>
        </div>

        <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {stats.map((stat) => (<div key={stat.label} className="rounded-2xl border border-surface-container bg-surface-container-lowest p-4 shadow-sm">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${stat.tone}`}>
                <Icon name={stat.icon} size={21}/>
              </div>
              <p className="font-display text-[26px] font-bold leading-none tracking-tight text-primary">{stat.value}</p>
              <p className="mt-1 text-[12px] font-semibold text-primary">{stat.label}</p>
              <p className="mt-0.5 text-[10px] text-on-surface-variant">{stat.trend}</p>
            </div>))}
        </section>

        <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
          <section className="rounded-2xl border border-surface-container bg-surface-container-lowest p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-[16px] font-bold text-primary">Résumés partagés récents</h2>
              <Link to="/pro/patients" className="text-[11px] font-semibold text-secondary hover:underline">
                Tout voir
              </Link>
            </div>
            <div className="mt-3 flex flex-col divide-y divide-surface-container">
              {proPatients.slice(0, 4).map((p) => (<Link key={p.id} to={p.id === 'ID-DRP-84920' ? '/pro/patients/ID-DRP-84920' : '/pro/patients'} className="flex items-center gap-3 py-3 transition hover:opacity-80">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-container text-[11px] font-bold text-primary">
                    {p.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-primary">{p.name}</p>
                    <p className="truncate text-[11px] text-on-surface-variant">
                      {p.id} · {p.genotype} · {p.lastSummary}
                    </p>
                  </div>
                  {p.unread && (<span className="flex items-center gap-1 rounded-full bg-secondary-fixed px-2 py-0.5 text-[9px] font-semibold text-secondary">
                      non lu
                    </span>)}
                  <Icon name="chevron_right" size={18} className="text-outline"/>
                </Link>))}
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <div className="rounded-2xl border border-surface-container bg-surface-container-lowest p-4 shadow-sm">
              <h2 className="flex items-center gap-1.5 font-display text-[16px] font-bold text-primary">
                <Icon name="notifications_active" size={18} className="text-error"/> Alertes à qualifier
              </h2>
              <div className="mt-3 flex flex-col gap-2">
                <div className="rounded-xl bg-error-container/40 p-3">
                  <p className="text-[12px] font-semibold text-on-error-container">Awa B. — douleur 7/10</p>
                  <p className="text-[10px] text-on-surface-variant">Signalée il y a 2 h · 06 mai 2025</p>
                </div>
                <div className="rounded-xl bg-surface-container-low p-3">
                  <p className="text-[12px] font-semibold text-primary">Amadou D. — frissons + froid</p>
                  <p className="text-[10px] text-on-surface-variant">12 mai 2025 · résumé partagé</p>
                </div>
              </div>
              <button type="button" onClick={() => pushToast('File d’alertes ouverte.', 'monitor_heart')} className="mt-3 flex min-h-10 w-full items-center justify-center rounded-xl bg-primary text-[11px] font-semibold text-on-primary">
                Ouvrir la file d’alertes
              </button>
            </div>

            <div className="rounded-2xl border border-surface-container bg-primary p-4 text-on-primary shadow-sm">
              <h2 className="font-display text-[15px] font-bold">Actions rapides</h2>
              <div className="mt-3 flex flex-col gap-1.5">
                {[
            { icon: 'add_link', label: 'Lier un nouveau dossier' },
            { icon: 'history', label: 'Historique des consentements' },
            { icon: 'download', label: 'Exporter le registre RGPD' },
        ].map((action) => (<button key={action.label} type="button" onClick={() => pushToast(`${action.label} — simulation.`, action.icon)} className="flex min-h-10 items-center gap-2 rounded-lg bg-white/5 px-3 text-[11px] font-medium text-on-primary transition hover:bg-white/10">
                    <Icon name={action.icon} size={16} className="text-secondary-fixed"/> {action.label}
                  </button>))}
              </div>
            </div>
          </section>
        </div>

        <section className="rounded-2xl border border-surface-container bg-surface-container-lowest p-4 shadow-sm sm:p-5">
          <h2 className="font-display text-[16px] font-bold text-primary">Dossiers sous surveillance</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-wide text-on-surface-variant">
                  <th className="pb-2 font-semibold">Patient</th>
                  <th className="pb-2 font-semibold">Génotype</th>
                  <th className="pb-2 font-semibold">Dernier résumé</th>
                  <th className="pb-2 font-semibold">Statut</th>
                  <th className="pb-2"/>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {proPatients.map((p) => (<tr key={p.id} className="text-[12px]">
                    <td className="py-2.5">
                      <p className="font-semibold text-primary">{p.name}</p>
                      <p className="text-[10px] text-outline">{p.id}</p>
                    </td>
                    <td className="py-2.5 text-on-surface-variant">{p.genotype}</td>
                    <td className="py-2.5 text-on-surface-variant">{p.lastSummary}</td>
                    <td className="py-2.5">
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${p.status === 'À revoir' ? 'bg-error-container text-on-error-container' : 'bg-secondary-fixed text-secondary'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-2.5 text-right">
                      <Link to={p.id === 'ID-DRP-84920' ? '/pro/patients/ID-DRP-84920' : '/pro/patients'} className="text-[11px] font-semibold text-secondary hover:underline">
                        Ouvrir
                      </Link>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </ProShell>);
}
