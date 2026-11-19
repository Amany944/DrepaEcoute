export function SectionTitle({ title, action }) {
    return (<div className="flex items-center justify-between gap-3">
      <h2 className="font-display text-[18px] font-bold tracking-tight text-primary">{title}</h2>
      {action}
    </div>);
}
