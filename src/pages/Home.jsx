import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { patient } from '../data/mock';
import { PatientHeader, PatientShell } from '../components/layout/PatientShell';
import { Icon } from '../components/ui/Icon';
import { SectionTitle } from '../components/ui/SectionTitle';
import { cn } from '../lib/utils';
const statusStyles = {
    'partagé': 'bg-secondary-fixed text-on-secondary-fixed',
    'confirmé': 'bg-surface-container-highest text-on-surface',
    'non confirmé': 'bg-surface-container text-on-surface-variant',
};
export default function Home() {
    const navigate = useNavigate();
    const conversations = useAppStore((s) => s.conversations);
    const demoMode = useAppStore((s) => s.demoMode);
    const last = conversations[0];
    const recent = conversations.slice(0, 3);
    return (<PatientShell>
      <PatientHeader logo/>
      <main className="flex flex-1 flex-col gap-4 px-4 pb-8 pt-4">
        <div className="flex items-start gap-2.5 rounded-xl bg-surface-container-high p-3.5 shadow-sm">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-container text-secondary">
            <Icon name="verified_user" size={20} filled/>
          </span>
          <div>
            <p className="text-[13px] font-semibold text-primary">Protocole de recherche médicale</p>
            <p className="mt-0.5 text-[12px] leading-snug text-on-surface-variant">
              Carnet de liaison interactif. Il ne remplace jamais votre hématologue et ne pose aucun diagnostic.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <motion.h1 initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="font-display text-[26px] font-bold tracking-tight text-primary">
              Bonjour {patient.firstName} 👋
            </motion.h1>
            <p className="text-[13px] text-on-surface-variant">Comment vous sentez-vous aujourd’hui ?</p>
          </div>
          <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-secondary-fixed/40 text-secondary shadow-sm">
            <span className="absolute inset-0 bg-gradient-to-tr from-secondary/15 to-transparent"/>
            <Icon name="spa" size={30} filled className="relative"/>
          </div>
        </div>

        {demoMode && (<div className="flex items-center gap-2 rounded-xl border border-secondary/20 bg-secondary-fixed/30 px-3 py-2 text-[11px] font-medium text-secondary">
            <Icon name="auto_stories" size={16}/>
            Mode aperçu — les données affichées sont fictives.
            <button type="button" onClick={() => navigate('/connexion')} className="ml-auto font-semibold underline">
              Créer un compte
            </button>
          </div>)}

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-container to-primary p-5 text-on-primary shadow-md">
          <div className="pointer-events-none absolute -bottom-8 -right-6 h-36 w-36 rounded-full bg-secondary-container/15 blur-2xl"/>
          <div className="relative z-10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-secondary-container/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-secondary-fixed">
                Point d’écoute quotidien
              </span>
              <span className="flex items-center gap-1 text-[10px] text-surface-variant">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary-container"/>
                Assistant actif
              </span>
            </div>
            <div>
              <h2 className="font-display text-[21px] font-bold leading-tight">Raconter ma journée ou mes ressentis</h2>
              <p className="mt-1 text-[12px] leading-relaxed text-on-primary-container">
                Exprimez librement vos douleurs, votre fatigue ou vos prises de médicaments par la voix ou par écrit.
              </p>
            </div>
            <button type="button" onClick={() => navigate('/conversation')} className="mt-1 flex min-h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-secondary-container px-4 text-[15px] font-bold text-on-secondary-container shadow-md transition hover:bg-secondary-fixed active:scale-[0.98]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-on-secondary-container/15">
                <Icon name="mic" size={22} filled/>
              </span>
              Démarrer une conversation
            </button>
          </div>
        </div>

        {last && (<div className="flex flex-col gap-3 rounded-3xl bg-surface-container-lowest p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <Icon name="event_note" size={17} className="text-secondary"/>
                  <span className="text-[13px] font-semibold text-primary">Dernier résumé disponible</span>
                </div>
                <p className="mt-0.5 text-[11px] text-on-surface-variant">
                  {last.date} à {last.time} · Séance validée
                </p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-outline-variant/60 bg-surface-container-high px-2.5 py-1 text-[10px] font-semibold text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-outline"/>
                {last.status === 'partagé' ? 'Partagé' : 'Non partagé'}
              </span>
            </div>

            <div className="rounded-2xl bg-surface-container-low p-3.5">
              <div className="flex flex-wrap gap-1.5">
                {last.tags.map((tag) => (<span key={tag} className="rounded-md bg-surface-container-highest px-2 py-0.5 text-[10px] font-medium text-on-surface">
                    {tag}
                  </span>))}
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-on-surface-variant">« {last.aiSummary} »</p>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-secondary">
                <Icon name="verified" size={16}/> Relu et approuvé par vous
              </span>
              <button type="button" onClick={() => navigate('/historique')} className="flex min-h-10 items-center gap-0.5 rounded-xl bg-surface-container-high px-3 text-[12px] font-semibold text-primary transition hover:bg-surface-container-highest active:scale-[0.98]">
                Consulter <Icon name="chevron_right" size={17}/>
              </button>
            </div>
          </div>)}

        <div className="grid grid-cols-2 gap-2.5">
          <Link to="/confidentialite" className="group flex min-h-[124px] flex-col justify-between rounded-2xl border border-surface-container-high bg-surface-container-lowest p-3.5 shadow-sm transition hover:bg-surface-container-low active:scale-[0.98]">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-container text-primary transition group-hover:scale-105">
              <Icon name="shield_with_heart" size={23}/>
            </span>
            <span>
              <span className="block text-[12px] font-semibold leading-snug text-primary">
                Partages &amp; médecins autorisés
              </span>
              <span className="mt-0.5 block text-[11px] text-on-surface-variant">{patient.doctor}</span>
            </span>
          </Link>
          <Link to="/conversation" className="group flex min-h-[124px] flex-col justify-between rounded-2xl border border-surface-container-high bg-surface-container-lowest p-3.5 shadow-sm transition hover:bg-surface-container-low active:scale-[0.98]">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-fixed text-secondary transition group-hover:scale-105">
              <Icon name="water_bottle" size={23}/>
            </span>
            <span>
              <span className="block text-[12px] font-semibold leading-snug text-primary">
                Hydratation &amp; prévention
              </span>
              <span className="mt-0.5 block text-[11px] text-on-surface-variant">Objectif 3 L · Conseils fraîcheur</span>
            </span>
          </Link>
        </div>

        <div className="flex flex-col gap-2 pt-1">
          <SectionTitle title="Conversations récentes" action={<Link to="/historique" className="text-[12px] font-semibold text-secondary hover:underline">
                Tout voir
              </Link>}/>
          {recent.map((conversation) => (<Link key={conversation.id} to="/historique" className="flex items-center justify-between gap-3 rounded-xl bg-surface-container-lowest p-3 shadow-sm transition hover:bg-surface-container-low">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-surface-container text-primary">
                  <span className="text-[9px] font-medium uppercase leading-none text-on-surface-variant">
                    {conversation.date.split(' ')[1].slice(0, 3)}
                  </span>
                  <span className="mt-0.5 font-display text-[15px] font-bold leading-none">
                    {conversation.date.split(' ')[0]}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-primary">{conversation.title}</p>
                  <p className="truncate text-[11px] text-on-surface-variant">{conversation.excerpt}</p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className={cn('rounded-full px-2 py-0.5 text-[9px] font-semibold', statusStyles[conversation.status])}>
                  {conversation.status}
                </span>
                <span className="text-[9px] text-outline">{conversation.time}</span>
              </div>
            </Link>))}
        </div>

        <Link to="/profil" className="mt-1 flex min-h-14 items-center justify-between rounded-2xl bg-secondary-fixed/30 p-3 shadow-sm transition hover:bg-secondary-fixed/40">
          <span className="flex items-center gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-fixed text-secondary">
              <Icon name="medical_services" size={22}/>
            </span>
            <span>
              <span className="block text-[13px] font-semibold text-on-secondary-fixed">Prochaine consultation</span>
              <span className="block text-[11px] text-on-secondary-fixed-variant">{patient.nextAppointment}</span>
            </span>
          </span>
          <Icon name="chevron_right" size={22} className="text-secondary"/>
        </Link>
      </main>
    </PatientShell>);
}
