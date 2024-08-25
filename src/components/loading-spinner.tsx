import { ImSpinner9 } from 'react-icons/im';
import { cn } from '@/lib/utils';
import type { IconBaseProps, IconType } from 'react-icons/lib';

type LoadingSpinnerProps =
    | ({
          icon?: IconType;
          page?: false;
          containerProps?: never;
      } & IconBaseProps)
    | ({
          icon?: IconType;
          page: true;
          containerProps?: React.ComponentPropsWithoutRef<'div'>;
      } & IconBaseProps);

export default function LoadingSpinner({
    icon: Icon = ImSpinner9,
    page,
    className,
    containerProps,
    ...props
}: LoadingSpinnerProps) {
    const iconClasses = cn('animate-spin size-6', {
        'size-44': page,
    });
    const icon = <Icon className={iconClasses} {...props} />;

    if (page) {
        let containerPropsWithoutClassName: Omit<
            typeof containerProps,
            'className'
        > = {};
        let containerClasses: string | undefined;

        if (containerProps) {
            const { className: containerClassName, ...rest } = containerProps;

            containerPropsWithoutClassName = rest;
            containerClasses = containerClassName;
        }
        return (
            <div
                className={cn(
                    'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                    containerClasses,
                )}
                {...containerPropsWithoutClassName}
            >
                {icon}
            </div>
        );
    }

    return icon;
}
