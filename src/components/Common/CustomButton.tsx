import React from 'react';
import Link from 'next/link';

interface CustomButtonProps {
  href: string;
  children: React.ReactNode;
  variant: 'outline' | 'solid';
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ href, children, variant, className = '' }) => {
  const baseClasses = 'w-full px-auto py-3 text-base font-medium transition duration-300 rounded-md text-center inline-block';
  
  const variantClasses = {
    outline: 'bg-transparent border border-dark dark:border-white text-dark dark:text-white hover:bg-dark hover:text-white dark:hover:bg-white dark:hover:text-dark',
    solid: 'bg-purple-500 text-white hover:bg-purple-700'
  };

  return (
    <Link href={href} className="w-full">
      <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
        {children}
      </div>
    </Link>
  );
};

export default CustomButton;