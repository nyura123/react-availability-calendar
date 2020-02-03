import { CSSProperties } from 'react';

type StyleOrFunc<StyleProps> =
  | CSSProperties
  | ((p: StyleProps) => CSSProperties);

type ClassNameOrFunc<StyleProps> =
  | (string | undefined)
  | ((p: StyleProps) => string | undefined);

export interface OverridableComponentProps<
  ComponentProps,
  InternalProps,
  StyleProps
> {
  style?: StyleOrFunc<StyleProps>;
  className?: ClassNameOrFunc<StyleProps>;
  Root?: React.ElementType<ComponentProps>;
  internalProps?: InternalProps;
}

export interface ResolvedOverride<ComponentProps, InternalProps> {
  style?: CSSProperties;
  className?: string;
  Root?: React.ElementType<ComponentProps>;
  internalProps?: InternalProps;
}

function resolveStyle<StyleProps>(
  style?: StyleOrFunc<StyleProps>,
  styleProps?: StyleProps
) {
  if (typeof style === 'function') {
    return styleProps ? style(styleProps) : style({} as any);
  }
  return style;
}

function resolveClassName<StyleProps>(
  className?: ClassNameOrFunc<StyleProps>,
  styleProps?: StyleProps
) {
  if (typeof className === 'function') {
    return styleProps ? className(styleProps) : className({} as any);
  }
  return className;
}

export function getOverride<
  O extends OverridableComponentProps<T, U, K>,
  T,
  U,
  K
>(
  o: O | undefined,
  defaultSpec: O,
  styleProps?: K,
  _t?: T,
  _u?: U,
  _k?: K
): ResolvedOverride<T, U> {
  if (o === undefined) {
    return {
      Root: defaultSpec.Root,
      className: resolveClassName(defaultSpec.className, styleProps),
      style: { ...resolveStyle(defaultSpec.style, styleProps) },
      internalProps: defaultSpec.internalProps,
    };
  }

  return {
    Root: o.Root || defaultSpec.Root,
    className:
      resolveClassName(o.className, styleProps) ||
      resolveClassName(defaultSpec.className, styleProps),
    style: {
      ...resolveStyle(defaultSpec.style, styleProps),
      ...resolveStyle(o.style, styleProps),
    },
    internalProps: { ...defaultSpec.internalProps, ...o.internalProps } as U,
  };
}
