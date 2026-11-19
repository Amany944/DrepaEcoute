import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PatientHeader, PatientShell } from '../components/layout/PatientShell';
import { Icon } from '../components/ui/Icon';
import { useAppStore } from '../store/useAppStore';
import { cn } from '../lib/utils';
const fallback = {
    patientWords: 'Depuis ce matin vers 7h, j’ai une douleur lancinante dans les genoux et un peu dans le bas du dos. J’ai bu presque 2 litres d’eau et pris mon traitement.',
    aiSummary: 'Douleurs des genoux et du bas du dos apparues après une exposition au froid. Hydratation à 2 L et traitement habituel déclarés. Pas de fièvre rapportée.',
    tags: ['Douleur 4/10', 'Genoux & dos', '2 L d’eau'],
};
export default function SummaryReview() {
    const navigate = useNavigate();
    const draft = useAppStore((s) => s.draft);
    const confirmDraft = useAppStore((s) => s.confirmDraft);
    const pushToast = useAppStore((s) => s.pushToast);
    const [step, setStep] = useState(1);
    const [share, setShare] = useState(false);
    const content = draft ?? fallback;
    const finish = () => {
        const conversation = confirmDraft(share);
        pushToast(share
            ? 'Résumé confirmé et partagé avec Dr. Aïssatou Traoré.'
            : 'Résumé confirmé dans votre carnet, non partagé.', share ? 'share' : 'task_alt', 'success');
        navigate('/historique', { state: { highlight: conversation.id } });
    };
    return (<PatientShell withNav={false}>
      <PatientHeader title="Vérification du résumé" subtitle="Étape 2 sur 2 · avant enregistrement" backTo="/conversation"/>
      <main className="flex flex-1 flex-col gap-4 px-4 pb-8 pt-4">
        <div className="flex items-start gap-2.5 rounded-xl bg-secondary-fixed/30 p-3.5">
          <Icon name="lock" size={20} className="mt-0.5 shrink-0 text-secondary"/>
          <p className="text-[11px] leading-relaxed text-on-secondary-fixed-variant">
            La confirmation d’un résumé n’entraîne <strong className="text-on-secondary-fixed">aucun partage automatique</strong>{' '}
            vers un médecin. Vous choisissez explicitement.
          </p>
        </div>

        <div>
          <h1 className="font-display text-[24px] font-bold leading-tight tracking-tight text-primary">
            Relisez et confirmez ce que vous avez exprimé
          </h1>
          <div className="mt-3 flex items-center gap-2">
            {[1, 2].map((n) => (<div key={n} className="flex items-center gap-2">
                <span className={cn('flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold', step >= n ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant')}>
                  {step > n ? <Icon name="check" size={14}/> : n}
                </span>
                <span className={cn('text-[11px] font-medium', step >= n ? 'text-primary' : 'text-on-surface-variant')}>
                  {n === 1 ? 'Votre récit' : 'Reformulation IA'}
                </span>
                {n === 1 && <span className="mx-1 h-px w-6 bg-outline-variant"/>}
              </div>))}
          </div>
        </div>

        <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[12px] font-semibold text-primary">
              <Icon name="person" size={17}/> Déclaration patient
            </span>
            <span className="rounded-full bg-surface-container px-2 py-0.5 text-[9px] font-medium text-on-surface-variant">
              Mots exacts
            </span>
          </div>
          <p className="mt-2 rounded-xl bg-surface-container-low p-3 text-[12px] leading-relaxed text-on-surface-variant">
            « {content.patientWords} »
          </p>
        </div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-secondary/20 bg-surface-container-lowest p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[12px] font-semibold text-primary">
              <Icon name="psychology" size={17} className="text-secondary"/> Reformulation clinique IA
            </span>
            <span className="rounded-full bg-secondary-fixed px-2 py-0.5 text-[9px] font-semibold text-secondary">
              À valider
            </span>
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-on-surface-variant">{content.aiSummary}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {content.tags.map((tag) => (<span key={tag} className="rounded-md bg-surface-container-highest px-2 py-1 text-[10px] font-medium text-on-surface">
                {tag}
              </span>))}
          </div>
          <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-surface-container-low px-2.5 py-2 text-[10px] text-on-surface-variant">
            <Icon name="info" size={14} className="shrink-0"/>
            L’IA propose une reformulation, vous restez la seule source de vérité.
          </div>
        </motion.div>

        <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="flex items-center gap-1.5 text-[12px] font-semibold text-primary">
                <Icon name="share" size={17}/> Partager avec mon médecin
              </p>
              <p className="mt-1 text-[11px] leading-snug text-on-surface-variant">
                Dr. Aïssatou Traoré · CHU Necker. Vous pouvez révoquer l’accès à tout moment.
              </p>
            </div>
            <button type="button" role="switch" aria-checked={share} onClick={() => setShare((v) => !v)} className={cn('relative h-7 w-12 shrink-0 rounded-full transition-colors', share ? 'bg-secondary' : 'bg-surface-container-highest')}>
              <span className={cn('absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all', share ? 'left-6' : 'left-1')}/>
            </button>
          </div>
          <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-surface-container-low px-2.5 py-2 text-[10px] text-on-surface-variant">
            <Icon name="verified_user" size={14} className="shrink-0 text-secondary"/>
            {share ? 'Partage chiffré vers le dossier HDS du praticien.' : 'Le résumé restera privé dans votre carnet.'}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-2">
          <button type="button" onClick={() => (step === 1 ? setStep(2) : finish())} className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-[14px] font-bold text-on-primary shadow-md transition hover:bg-primary-container active:scale-[0.98]">
            <Icon name={step === 1 ? 'visibility' : 'task_alt'} size={20}/>
            {step === 1 ? 'J’ai relu, continuer' : share ? 'Confirmer et partager' : 'Confirmer dans mon carnet'}
          </button>
          <button type="button" onClick={() => {
            if (step === 2) {
                setStep(1);
            }
            else {
                pushToast('Retour à la conversation pour corriger.', 'edit_note');
                navigate('/conversation');
            }
        }} className="flex min-h-11 w-full items-center justify-center gap-1.5 rounded-full text-[12px] font-semibold text-on-surface-variant transition hover:bg-surface-container">
            <Icon name="arrow_back" size={16}/> {step === 2 ? 'Revenir à mon récit' : 'Corriger ma déclaration'}
          </button>
        </div>
      </main>
    </PatientShell>);
}
