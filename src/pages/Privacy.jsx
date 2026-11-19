import { useState } from 'react';
import { PatientHeader, PatientShell } from '../components/layout/PatientShell';
import { Icon } from '../components/ui/Icon';
import { useAppStore } from '../store/useAppStore';
import { cn } from '../lib/utils';
export default function Privacy() {
    const doctors = useAppStore((s) => s.doctors);
    const toggleDoctor = useAppStore((s) => s.toggleDoctor);
    const conversations = useAppStore((s) => s.conversations);
    const shareConsent = useAppStore((s) => s.shareConsent);
    const researchConsent = useAppStore((s) => s.researchConsent);
    const setShareConsent = useAppStore((s) => s.setShareConsent);
    const setResearchConsent = useAppStore((s) => s.setResearchConsent);
    const pushToast = useAppStore((s) => s.pushToast);
    const [confirmRevoke, setConfirmRevoke] = useState(false);
    const shared = conversations.filter((c) => c.status === 'partagé');
    const activeDoctors = doctors.filter((d) => d.active).length;
    const revoke = () => {
        doctors.filter((d) => d.active).forEach((d) => toggleDoctor(d.id));
        setConfirmRevoke(false);
        pushToast('Accès des médecins révoqué. Vos résumés redeviennent privés.', 'lock_person', 'warning');
    };
    return (<PatientShell>
      <PatientHeader title="Confidentialité & partages" subtitle="Espace souveraineté santé" backTo="/accueil" actions={<span className="flex items-center gap-1.5 rounded-full bg-secondary-fixed/60 px-2.5 py-1 text-[10px] font-semibold text-secondary">
            <Icon name="lock" size={13}/> Chiffré
          </span>}/>
      <main className="flex flex-1 flex-col gap-4 px-4 pb-8 pt-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-container to-primary p-5 text-on-primary shadow-md">
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-secondary-container/15 blur-2xl"/>
          <div className="relative flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-on-primary/10 text-secondary-fixed">
              <Icon name="lock" size={24} filled/>
            </span>
            <div>
              <h2 className="font-display text-[19px] font-bold leading-tight">Contrôle absolu &amp; consentement actif</h2>
              <p className="mt-1 text-[12px] leading-relaxed text-on-primary-container">
                Aucun médecin ne peut voir vos résumés sans votre autorisation active et vérifiée.
              </p>
            </div>
          </div>
        </div>

        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-display text-[16px] font-bold text-primary">Médecins autorisés</h3>
            <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-semibold', activeDoctors > 0 ? 'bg-secondary-fixed text-secondary' : 'bg-surface-container text-on-surface-variant')}>
              {activeDoctors} actif{activeDoctors > 1 ? 's' : ''}
            </span>
          </div>

          {doctors.map((doctor) => (<div key={doctor.id} className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-[13px] font-bold text-on-primary">
                  AT
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold text-primary">{doctor.name}</p>
                  <p className="text-[11px] text-on-surface-variant">
                    {doctor.speciality} · {doctor.hospital}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <span className={cn('flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold', doctor.active ? 'bg-secondary-fixed text-secondary' : 'bg-surface-container text-on-surface-variant')}>
                      <Icon name={doctor.active ? 'check' : 'person_off'} size={11}/>
                      {doctor.active ? 'Accès actif' : 'Accès révoqué'}
                    </span>
                    <span className="flex items-center gap-0.5 text-[9px] text-outline">
                      <Icon name="lock" size={11}/> chiffré
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                <div className="rounded-xl bg-surface-container-low p-2">
                  <p className="font-display text-[16px] font-bold text-primary">{doctor.summaries}</p>
                  <p className="text-[9px] text-on-surface-variant">résumés accessibles</p>
                </div>
                <div className="rounded-xl bg-surface-container-low p-2">
                  <p className="font-display text-[13px] font-bold text-primary">{doctor.sharedSince}</p>
                  <p className="text-[9px] text-on-surface-variant">depuis le</p>
                </div>
              </div>

              <div className="mt-2.5 flex gap-2">
                <button type="button" onClick={() => pushToast('Contenu partagé consultable dans votre historique.', 'visibility')} className="flex min-h-10 flex-1 items-center justify-center gap-1 rounded-xl bg-surface-container-high text-[11px] font-semibold text-primary transition hover:bg-surface-container-highest active:scale-[0.98]">
                  <Icon name="visibility" size={16}/> Voir ce qui est partagé
                </button>
                <button type="button" onClick={() => {
                if (doctor.active) {
                    setConfirmRevoke(true);
                }
                else {
                    toggleDoctor(doctor.id);
                    pushToast('Accès rétabli pour ce médecin.', 'check_circle', 'success');
                }
            }} className={cn('flex min-h-10 flex-1 items-center justify-center gap-1 rounded-xl text-[11px] font-semibold transition active:scale-[0.98]', doctor.active
                ? 'bg-error-container/60 text-on-error-container hover:bg-error-container'
                : 'bg-secondary-fixed text-secondary hover:bg-secondary-fixed-dim')}>
                  <Icon name={doctor.active ? 'person_remove' : 'person_add'} size={16}/>
                  {doctor.active ? 'Révoquer l’accès' : 'Rétablir'}
                </button>
              </div>
            </div>))}

          <button type="button" onClick={() => pushToast('Invitation sécurisée simulée pour un nouveau praticien.', 'forward_to_inbox')} className="flex min-h-12 w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-outline-variant text-[12px] font-semibold text-secondary transition hover:bg-surface-container-low">
            <Icon name="add_link" size={18}/> Autoriser un nouveau médecin
          </button>
        </section>

        <section className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm">
          <h3 className="flex items-center gap-1.5 font-display text-[15px] font-bold text-primary">
            <Icon name="inventory_2" size={18} className="text-secondary"/> Contenus actuellement transmis
          </h3>
          <div className="mt-2 flex flex-col gap-1.5">
            {shared.length === 0 && (<p className="rounded-lg bg-surface-container-low p-3 text-[11px] text-on-surface-variant">
                Aucun contenu partagé actuellement.
              </p>)}
            {shared.map((item) => (<div key={item.id} className="flex items-start gap-2 rounded-lg bg-surface-container-low p-2.5">
                <Icon name="check_circle" size={15} className="mt-0.5 shrink-0 text-secondary"/>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-semibold text-primary">{item.title}</p>
                  <p className="text-[10px] text-on-surface-variant">
                    {item.date} · synthèse validée par vous
                  </p>
                </div>
              </div>))}
          </div>
        </section>

        <section className="flex flex-col gap-2 rounded-2xl bg-surface-container-lowest p-4 shadow-sm">
          <h3 className="font-display text-[15px] font-bold text-primary">Préférences de consentement</h3>
          {[
            {
                label: 'Partage avec mes médecins',
                description: 'Autoriser les praticiens actifs à consulter mes synthèses partagées.',
                value: shareConsent,
                set: setShareConsent,
            },
            {
                label: 'Recherche anonymisée',
                description: 'Contribuer à la recherche sur la drépanocytose, sans donnée identifiante.',
                value: researchConsent,
                set: setResearchConsent,
            },
        ].map((item) => (<div key={item.label} className="flex items-start justify-between gap-3 rounded-xl bg-surface-container-low p-3">
              <div>
                <p className="text-[12px] font-semibold text-primary">{item.label}</p>
                <p className="mt-0.5 text-[10px] leading-snug text-on-surface-variant">{item.description}</p>
              </div>
              <button type="button" role="switch" aria-checked={item.value} onClick={() => {
                item.set(!item.value);
                pushToast(`${item.label} : ${!item.value ? 'activé' : 'désactivé'}.`, 'tune', 'success');
            }} className={cn('relative h-7 w-12 shrink-0 rounded-full transition-colors', item.value ? 'bg-secondary' : 'bg-surface-container-highest')}>
                <span className={cn('absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all', item.value ? 'left-6' : 'left-1')}/>
              </button>
            </div>))}
        </section>

        <section className="flex flex-col gap-2 rounded-2xl bg-surface-container-lowest p-4 shadow-sm">
          <h3 className="flex items-center gap-1.5 font-display text-[15px] font-bold text-primary">
            <Icon name="gavel" size={18} className="text-secondary"/> Vos droits RGPD
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => pushToast('Export complet demandé — lien sécurisé sous 24 h.', 'download', 'success')} className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-surface-container-high text-[11px] font-semibold text-primary transition hover:bg-surface-container-highest">
              <Icon name="download" size={16}/> Exporter mes données
            </button>
            <button type="button" onClick={() => pushToast('Suppression simulée : conservation légale de 10 ans rappelée.', 'delete_forever')} className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-error-container/50 text-[11px] font-semibold text-on-error-container transition hover:bg-error-container">
              <Icon name="delete_forever" size={16}/> Supprimer
            </button>
          </div>
          <p className="text-[10px] leading-relaxed text-outline">
            Données hébergées en France (HDS). Secret médical partagé sous consentement explicite · RGPD Art. 9.
          </p>
        </section>

        {confirmRevoke && (<div className="fixed inset-0 z-50 flex items-end justify-center bg-primary/40 p-4 backdrop-blur-sm sm:items-center">
            <div className="w-full max-w-md rounded-3xl bg-surface p-5 shadow-2xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-error-container text-on-error-container">
                <Icon name="person_remove" size={24}/>
              </div>
              <h3 className="mt-3 font-display text-[18px] font-bold text-primary">Révoquer tous les accès ?</h3>
              <p className="mt-1 text-[12px] leading-relaxed text-on-surface-variant">
                Les médecins autorisés ne pourront plus consulter vos nouveaux résumés. Vos données restent dans votre
                carnet.
              </p>
              <div className="mt-4 flex gap-2">
                <button type="button" onClick={() => setConfirmRevoke(false)} className="flex min-h-11 flex-1 items-center justify-center rounded-full bg-surface-container-high text-[12px] font-semibold text-primary">
                  Annuler
                </button>
                <button type="button" onClick={revoke} className="flex min-h-11 flex-1 items-center justify-center rounded-full bg-error-container text-[12px] font-semibold text-on-error-container">
                  Révoquer
                </button>
              </div>
            </div>
          </div>)}
      </main>
    </PatientShell>);
}
