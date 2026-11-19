import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProShell } from '../../components/layout/ProShell';
import { Icon } from '../../components/ui/Icon';
import { patient } from '../../data/mock';
import { useAppStore } from '../../store/useAppStore';
import { cn } from '../../lib/utils';
const tabs = ['Synthèses partagées', 'Suivi & alertes', 'Consentement'];
export default function ProPatientFile() {
    const navigate = useNavigate();
    const pushToast = useAppStore((s) => s.pushToast);
    const conversations = useAppStore((s) => s.conversations);
    const shared = conversations.filter((c) => c.status === 'partagé');
    const [tab, setTab] = useState('Synthèses partagées');
    const [validated, setValidated] = useState([]);
    const [note, setNote] = useState('');
    return (<ProShell title="Dossier patient" subtitle="Patients autorisés / Amadou D. (ID-DRP-84920)">
      <div className="flex flex-col gap-5">
        <Link to="/pro/patients" className="flex w-fit items-center gap-1 text-[11px] font-semibold text-secondary hover:underline">
          <Icon name="arrow_back" size={14}/> Retour aux patients
        </Link>

        <section className="rounded-2xl border border-surface-container bg-surface-container-lowest p-4 shadow-sm sm:p-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div className="flex items-start gap-3">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary font-display text-[17px] font-bold text-on-primary">
                AD
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-secondary text-on-secondary">
                  <Icon name="verified" size={11} filled/>
                </span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-[20px] font-bold leading-tight text-primary">{patient.fullName}</h2>
                  <span className="rounded-full bg-secondary-fixed px-2 py-0.5 text-[9px] font-semibold text-secondary">
                    {patient.genotype}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] text-on-surface-variant">
                  {patient.age} ans ({patient.birthDate}) · IPP {patient.carnetId}
                </p>
                <p className="text-[11px] text-on-surface-variant">
                  {patient.hospital} · Réf. {patient.doctor}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5 text-[9px]">
                  <span className="flex items-center gap-1 rounded-full bg-surface-container px-2 py-0.5 font-medium text-on-surface-variant">
                    <Icon name="lock_person" size={11}/> Consentement actif
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-surface-container px-2 py-0.5 font-medium text-on-surface-variant">
                    <Icon name="verified_user" size={11}/> Traçabilité HDS
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-surface-container px-2 py-0.5 font-medium text-on-surface-variant">
                    <Icon name="lock" size={11}/> AES-256
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => pushToast('Messagerie sécurisée ouverte.', 'forum', 'success')} className="flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary px-3 text-[11px] font-semibold text-on-primary sm:flex-none">
                <Icon name="forum" size={16}/> Message sécurisé
              </button>
              <button type="button" onClick={() => pushToast('Export PDF du dossier généré.', 'picture_as_pdf')} className="flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-surface-container-high px-3 text-[11px] font-semibold text-primary">
                <Icon name="download" size={16}/> PDF
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
            { label: 'Dernier résumé', value: '12 mai 2025' },
            { label: 'Résumés partagés', value: `${shared.length}` },
            { label: 'Alertes ouvertes', value: '1' },
            { label: 'Prochain RDV', value: '28 mai 2025' },
        ].map((item) => (<div key={item.label} className="rounded-xl bg-surface-container-low p-2.5">
                <p className="text-[9px] uppercase tracking-wide text-outline">{item.label}</p>
                <p className="mt-0.5 text-[12px] font-semibold text-primary">{item.value}</p>
              </div>))}
          </div>
        </section>

        <div className="flex gap-1.5 overflow-x-auto">
          {tabs.map((item) => (<button key={item} type="button" onClick={() => setTab(item)} className={cn('shrink-0 rounded-full px-3.5 py-2 text-[11px] font-semibold transition', tab === item ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant')}>
              {item}
            </button>))}
        </div>

        {tab === 'Synthèses partagées' && (<div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
            <div className="flex flex-col gap-3">
              {shared.map((summary) => {
                const isValidated = validated.includes(summary.id);
                return (<article key={summary.id} className="rounded-2xl border border-surface-container bg-surface-container-lowest p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[13px] font-semibold text-primary">{summary.title}</p>
                        <p className="text-[10px] text-on-surface-variant">
                          {summary.date} · {summary.time} · validé par le patient
                        </p>
                      </div>
                      <span className="flex items-center gap-1 rounded-full bg-secondary-fixed px-2 py-0.5 text-[9px] font-semibold text-secondary">
                        <Icon name="verified" size={11}/> Confirmé
                      </span>
                    </div>
                    <p className="mt-2 text-[12px] leading-relaxed text-on-surface-variant">{summary.aiSummary}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {summary.tags.map((tag) => (<span key={tag} className="rounded-md bg-surface-container-high px-2 py-0.5 text-[9px] font-medium text-on-surface">
                          {tag}
                        </span>))}
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-surface-container pt-2.5">
                      <span className="flex items-center gap-1 text-[10px] text-on-surface-variant">
                        <Icon name="person" size={13}/> Déclaration patient · reformulée par IA
                      </span>
                      <button type="button" onClick={() => {
                        if (isValidated)
                            return;
                        setValidated((prev) => [...prev, summary.id]);
                        pushToast('Synthèse validée et ajoutée au dossier clinique.', 'task_alt', 'success');
                    }} disabled={isValidated} className={cn('flex min-h-9 items-center gap-1 rounded-lg px-2.5 text-[10px] font-semibold transition', isValidated
                        ? 'bg-secondary-fixed text-secondary'
                        : 'bg-surface-container-high text-primary hover:bg-surface-container-highest')}>
                        <Icon name={isValidated ? 'check_circle' : 'task_alt'} size={15}/>
                        {isValidated ? 'Validée' : 'Valider la synthèse'}
                      </button>
                    </div>
                  </article>);
            })}
              {shared.length === 0 && (<div className="rounded-2xl bg-surface-container-lowest p-8 text-center shadow-sm">
                  <Icon name="clinical_notes" size={30} className="text-outline"/>
                  <p className="mt-2 text-[12px] font-semibold text-primary">Aucun résumé partagé</p>
                </div>)}
            </div>

            <aside className="flex flex-col gap-3">
              <div className="rounded-2xl border border-surface-container bg-surface-container-lowest p-4 shadow-sm">
                <h3 className="flex items-center gap-1.5 font-display text-[14px] font-bold text-primary">
                  <Icon name="edit_note" size={17} className="text-secondary"/> Note de consultation
                </h3>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4} placeholder="Ajouter une observation clinique au dossier…" className="mt-2 w-full resize-none rounded-xl bg-surface-container-low p-2.5 text-[11px] outline-none placeholder:text-outline focus:bg-white"/>
                <button type="button" onClick={() => {
                if (!note.trim())
                    return;
                pushToast('Note clinique enregistrée et horodatée.', 'save', 'success');
                setNote('');
            }} className="mt-2 flex min-h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-primary text-[11px] font-semibold text-on-primary">
                  <Icon name="save" size={16}/> Enregistrer la note
                </button>
              </div>

              <div className="rounded-2xl border border-surface-container bg-surface-container-lowest p-4 shadow-sm">
                <h3 className="font-display text-[14px] font-bold text-primary">Derniers événements</h3>
                <div className="mt-3 flex flex-col gap-3">
                  {[
                { icon: 'share', text: 'Résumé du 12 mai partagé', time: 'il y a 2 jours' },
                { icon: 'clinical_notes', text: 'Synthèse « Alerte froid » consultée', time: '10 mai' },
                { icon: 'verified_user', text: 'Consentement renouvelé', time: '15 mars' },
            ].map((event) => (<div key={event.text} className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-container text-secondary">
                        <Icon name={event.icon} size={13}/>
                      </span>
                      <div>
                        <p className="text-[11px] font-medium text-primary">{event.text}</p>
                        <p className="text-[9px] text-outline">{event.time}</p>
                      </div>
                    </div>))}
                </div>
              </div>
            </aside>
          </div>)}

        {tab === 'Suivi & alertes' && (<div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-surface-container bg-surface-container-lowest p-4 shadow-sm">
              <h3 className="flex items-center gap-1.5 font-display text-[14px] font-bold text-primary">
                <Icon name="monitor_heart" size={17} className="text-error"/> Alertes
              </h3>
              <div className="mt-2 rounded-xl bg-error-container/40 p-3">
                <p className="text-[12px] font-semibold text-on-error-container">Douleur genoux 4/10 persistante</p>
                <p className="mt-0.5 text-[10px] text-on-surface-variant">
                  Signalée le 12 mai · à réévaluer si aggravation ou fièvre.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-surface-container bg-surface-container-lowest p-4 shadow-sm">
              <h3 className="flex items-center gap-1.5 font-display text-[14px] font-bold text-primary">
                <Icon name="water_drop" size={17} className="text-secondary"/> Observance déclarée
              </h3>
              <div className="mt-3 flex flex-col gap-2">
                {[
                { label: 'Hydratation (objectif 3 L)', value: '83 %' },
                { label: 'Hydroxyurée', value: '96 %' },
                { label: 'Acide folique', value: '91 %' },
            ].map((item) => (<div key={item.label} className="flex items-center justify-between rounded-lg bg-surface-container-low px-2.5 py-2">
                    <span className="text-[11px] text-on-surface-variant">{item.label}</span>
                    <span className="text-[11px] font-bold text-primary">{item.value}</span>
                  </div>))}
              </div>
            </div>
          </div>)}

        {tab === 'Consentement' && (<div className="rounded-2xl border border-surface-container bg-surface-container-lowest p-4 shadow-sm sm:p-5">
            <h3 className="flex items-center gap-1.5 font-display text-[15px] font-bold text-primary">
              <Icon name="verified_user" size={18} className="text-secondary"/> Consentement au partage
            </h3>
            <div className="mt-3 flex flex-col gap-2 text-[12px]">
              {[
                { label: 'Praticien autorisé', value: 'Dr. Aïssatou Traoré (RPPS 10103948271)' },
                { label: 'Portée', value: 'Synthèses cliniques validées par le patient' },
                { label: 'Depuis', value: '15 mars 2025' },
                { label: 'Dernière vérification', value: '12 mai 2025 · 20 h 45' },
            ].map((row) => (<div key={row.label} className="flex flex-col justify-between gap-0.5 rounded-xl bg-surface-container-low px-3 py-2 sm:flex-row sm:items-center">
                  <span className="text-on-surface-variant">{row.label}</span>
                  <span className="font-semibold text-primary">{row.value}</span>
                </div>))}
            </div>
            <button type="button" onClick={() => navigate('/confidentialite')} className="mt-3 flex min-h-10 items-center gap-1 text-[11px] font-semibold text-secondary hover:underline">
              <Icon name="open_in_new" size={14}/> Voir la politique de partage côté patient
            </button>
          </div>)}
      </div>
    </ProShell>);
}
