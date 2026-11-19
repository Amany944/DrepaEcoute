import { cn } from '../../lib/utils';
import { Icon } from './Icon';
const variants = {
    primary: 'bg-primary text-on-primary hover:bg-primary-container shadow-sm',
    secondary: 'bg-secondary text-on-secondary hover:bg-secondary/90 shadow-sm',
    soft: 'bg-surface-container-high text-primary hover:bg-surface-container-highest border border-outline-variant/40',
    ghost: 'text-on-surface-variant hover:bg-surface-container',
    danger: 'bg-error-container text-on-error-container hover:bg-error-container/80',
};
const sizes = {
    sm: 'h-10 px-4 text-[13px] gap-1.5 rounded-full',
    md: 'h-12 px-5 text-[14px] gap-2 rounded-full',
    lg: 'h-14 px-6 text-[15px] gap-2.5 rounded-2xl',
};
export function Button({ variant = 'primary', size = 'md', icon, iconRight, children, fullWidth, className, ...props }) {
    return (<button className={cn('inline-flex items-center justify-center font-semibold transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50', variants[variant], sizes[size], fullWidth && 'w-full', className)} {...props}>
      {icon && <Icon name={icon} size={20}/>}
      {children}
      {iconRight && <Icon name={iconRight} size={20}/>}
    </button>);
}
