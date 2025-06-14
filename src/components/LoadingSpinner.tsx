import { ImSpinner9 } from 'react-icons/im';
import { cn } from '@/lib/utils';
import type { IconBaseProps, IconType } from 'react-icons/lib';

type LoadingSpinnerProps = (
    | {
          icon?: IconType;
          page?: false;
          containerProps?: never;
      }
    | {
          icon?: IconType;
          page: true;
          containerProps?: React.ComponentPropsWithoutRef<'div'>;
      }
) &
    IconBaseProps;

export default function LoadingSpinner({
    icon: Icon = ImSpinner9,
    page,
    className,
    containerProps,
    ...props
}: LoadingSpinnerProps) {
    const icon = (
        <Icon
            className={cn('size-6 animate-spin', {
                'size-40': page,
            })}
            {...props}
        />
    );

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
                    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
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
