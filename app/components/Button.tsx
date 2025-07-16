"use client";

import { ReactNode, ButtonHTMLAttributes, ComponentProps } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type ButtonBaseProps = {
  variant?: 'primaryModra' | 'primaryBila' | 'secondaryModra' | 'secondaryBila';
  children: ReactNode;
  className?: string;
  onClick?: () => void;
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
  onClick,
  ...props
}: ButtonProps) {
  const router = useRouter();
  const baseStyles = "px-10 py-2 rounded-sm transition-colors duration-200 font-lekton font-bold";
  const variantStyles = {
    primaryModra: "bg-modra text-white hover:bg-modraHover",
    primaryBila: "bg-white text-modra hover:bg-bilaHover",
    secondaryBila: "bg-transparent text-white border border-white hover:bg-white hover:text-modra",
    secondaryModra: "bg-transparent text-modra border border-modra hover:bg-white hover:text-modra"
  };

  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  // Pokud je přítomen onClick, použijeme button element místo Link
  if (onClick) {
    const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button className={buttonStyles} onClick={onClick} {...buttonProps}>
        {children}
      </button>
    );
  }

  if ('href' in props) {
    const { href, target, ...restProps } = props as ButtonAsLinkProps;
    
    // Pro /registrace používáme standardní anchor tag místo Next.js Link
    if (href === '/registrace') {
      return (
        <a 
          href="/registrace"
          className={buttonStyles}
          target={target}
          onClick={(e) => {
            e.preventDefault();
            router.push('/registrace');
          }}
          {...restProps}
        >
          {children}
        </a>
      );
    }
    
    return (
      <Link 
        href={href as string} 
        className={buttonStyles}
        target={target}
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