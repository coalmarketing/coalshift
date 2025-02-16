import { ReactNode, ButtonHTMLAttributes, ComponentProps } from 'react';
import Link from 'next/link';

type ButtonBaseProps = {
  variant?: 'primaryModra' | 'primaryBila' | 'secondaryModra' | 'secondaryBila';
  children: ReactNode;
  className?: string;
};

type ButtonAsButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
};

type ButtonAsLinkProps = ButtonBaseProps & ComponentProps<typeof Link>;

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export default function Button({ 
  variant = 'primaryModra', 
  children, 
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = "px-10 py-2 rounded-sm transition-colors duration-200 font-lekton font-bold";
  const variantStyles = {
    primaryModra: "bg-modra text-white hover:bg-modraHover",
    primaryBila: "bg-white text-modra hover:bg-bilaHover",
    secondaryBila: "bg-transparent text-white border border-white hover:bg-white hover:text-modra",
    secondaryModra: "bg-transparent text-modra border border-modra hover:bg-white hover:text-modra"
  };

  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if ('href' in props) {
    const { href, target, onClick, ...restProps } = props as ButtonAsLinkProps;
    return (
      <Link 
        href={href as string} 
        className={buttonStyles}
        target={target}
        onClick={onClick}
        {...restProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonStyles} {...props}>
      {children}
    </button>
  );
} 