import { cn } from '../../lib/utils';
export function Icon({ name, className, filled = false, size }) {
    return (<span aria-hidden="true" className={cn('material-symbols-outlined', filled && 'filled-icon', className)} style={size ? { fontSize: `${size}px` } : undefined}>
      {name}
    </span>);
}
