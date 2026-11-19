import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { cn } from '../lib/utils';
export default function Login() {
    const navigate = useNavigate();
    const login = useAppStore((s) => s.login);
    const pushToast = useAppStore((s) => s.pushToast);
    const [mode, setMode] = useState('login');
    const [identifier, setIdentifier] = useState('ID-DRP-84920');
    const [pin, setPin] = useState('');
    const [showPin, setShowPin] = useState(false);
    const [loading, setLoading] = useState(false);
    const submit = (event) => {
        event.preventDefault();
        setLoading(true);
        pushToast(mode === 'login' ? 'Connexion sécurisée en cours…' : 'Création du dossier anonymisé…', 'lock_open', 'success');
        window.setTimeout(() => {
            login(false);
            navigate('/accueil');
        }, 700);
    };
    const biometrics = () => {
        pushToast('Empreinte reconnue — bienvenue Amadou.', 'fingerprint', 'success');
        window.setTimeout(() => {
            login(false);
            navigate('/accueil');
        }, 500);
    };
    return (<div className="app-backdrop min-h-dvh">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto flex min-h-dvh w-full max-w-xl flex-col bg-surface px-4 pb-safe pt-safe sm:my-6 sm:min-h-[calc(100dvh-3rem)] sm:rounded-3xl sm:shadow-[0_20px_80px_rgba(15,41,66,0.12)]">
        <header className="flex items-center justify-between py-4">
          <button type="button" onClick={() => navigate('/')} className="flex h-11 w-11 items-center justify-center rounded-full text-on-surface-variant transition hover:bg-surface-container" aria-label="Retour">
            <Icon name="arrow_back" size={22}/>
          </button>
          <div className="flex items-center gap-1.5 rounded-full bg-secondary-fixed/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-secondary">
            <Icon name="lock" size={13}/> HDS · RGPD Art. 9
          </div>
        </header>

        <div className="flex flex-1 flex-col justify-center gap-5 px-1 pb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-md">
              <Icon name="water_drop" size={28} filled className="text-secondary-container"/>
            </div>
            <div>
              <h1 className="font-display text-[26px] font-extrabold leading-tight tracking-tight text-primary">
                Espace patient
              </h1>
              <p className="text-[12px] text-on-surface-variant">Votre carnet d’écoute, strictement confidentiel.</p>
            </div>
          </div>

          <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm sm:p-5">
            <div className="flex rounded-full bg-surface-container p-1" role="tablist" aria-label="Connexion ou inscription">
              {['login', 'register'].map((tab) => (<button key={tab} type="button" role="tab" aria-selected={mode === tab} onClick={() => setMode(tab)} className={cn('flex-1 rounded-full py-2.5 text-[13px] font-semibold transition-all', mode === tab ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface')}>
                  {tab === 'login' ? 'Connexion' : 'Créer un compte'}
                </button>))}
            </div>

            <form onSubmit={submit} className="mt-4 flex flex-col gap-3.5">
              <label className="flex flex-col gap-1.5">
                <span className="flex items-center justify-between text-[13px] font-semibold text-primary">
                  Identifiant patient ou email
                  <button type="button" className="text-[11px] font-medium text-secondary hover:underline">
                    Aide dossier
                  </button>
                </span>
                <div className="relative">
                  <Icon name="mail" size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant"/>
                  <input required value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="ex : p-94821 ou nom@domaine.fr" className="h-13 w-full rounded-xl bg-surface-container-low py-3.5 pl-11 pr-4 text-sm text-on-surface outline-none transition placeholder:text-outline focus:bg-white focus:ring-2 focus:ring-secondary/30"/>
                </div>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold text-primary">
                  {mode === 'login' ? 'Code PIN ou mot de passe' : 'Choisissez un code PIN (6 chiffres)'}
                </span>
                <div className="relative">
                  <Icon name="lock" size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant"/>
                  <input required type={showPin ? 'text' : 'password'} inputMode={mode === 'register' ? 'numeric' : 'text'} value={pin} onChange={(e) => setPin(e.target.value)} placeholder="••••••••" className="h-13 w-full rounded-xl bg-surface-container-low py-3.5 pl-11 pr-12 text-sm text-on-surface outline-none transition placeholder:text-outline focus:bg-white focus:ring-2 focus:ring-secondary/30"/>
                  <button type="button" onClick={() => setShowPin((v) => !v)} aria-label="Afficher le code" className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-on-surface-variant transition hover:text-primary">
                    <Icon name={showPin ? 'visibility_off' : 'visibility'} size={20}/>
                  </button>
                </div>
              </label>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-[11px] text-on-surface-variant">
                  <input type="checkbox" className="h-4 w-4 accent-[#006398]" defaultChecked/>
                  Se souvenir de moi
                </label>
                <button type="button" onClick={() => pushToast('Un lien sécurisé de récupération a été simulé.', 'mark_email_read')} className="text-[11px] font-medium text-secondary hover:underline">
                  Identifiant oublié ?
                </button>
              </div>

              <Button type="submit" size="lg" fullWidth disabled={loading} iconRight={loading ? undefined : 'arrow_forward'}>
                {loading ? 'Ouverture du carnet…' : mode === 'login' ? 'Se connecter à mon espace' : 'Créer mon dossier'}
              </Button>
            </form>

            <div className="my-4 flex items-center gap-3">
              <span className="h-px flex-1 bg-surface-container"/>
              <span className="text-[11px] text-on-surface-variant">ou</span>
              <span className="h-px flex-1 bg-surface-container"/>
            </div>

            <button type="button" onClick={biometrics} className="flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-[13px] font-semibold text-primary transition hover:bg-surface-container-highest active:scale-[0.98]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-on-secondary">
                <Icon name="fingerprint" size={20}/>
              </span>
              Connexion rapide par empreinte
            </button>

            <div className="mt-4 flex flex-col items-center gap-2 rounded-xl bg-surface-container-low p-3 text-center">
              <p className="text-[11px] leading-snug text-on-surface-variant">
                Première visite ? Explorez l’interface sans créer de profil permanent.
              </p>
              <button type="button" onClick={() => {
            login(true);
            pushToast('Mode démo initialisé. Bienvenue dans l’exploration.', 'auto_stories');
            navigate('/accueil');
        }} className="flex items-center gap-1.5 text-[12px] font-semibold text-secondary hover:underline">
                <Icon name="auto_stories" size={17}/> Mode démo
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl bg-surface-container-lowest p-3.5 shadow-sm">
            <Icon name="shield_lock" size={20} className="mt-0.5 shrink-0 text-secondary"/>
            <p className="text-[11px] leading-relaxed text-on-surface-variant">
              Données hébergées en environnement de recherche sécurisé conforme{' '}
              <strong className="text-primary">HDS</strong>. Chiffrement de bout en bout, aucun partage sans votre
              accord.
            </p>
          </div>
        </div>
      </motion.div>
    </div>);
}
