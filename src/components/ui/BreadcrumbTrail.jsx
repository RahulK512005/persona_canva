
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';

const BreadcrumbTrail = ({ className }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav aria-label="breadcrumb" className={cn("text-sm text-on-surface-variant", className)}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="hover:underline">Home</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={name} className="flex items-center space-x-2">
              <span>/</span>
              {isLast ? (
                <span className="font-medium text-on-surface">{name.replace(/-/g, ' ')}</span>
              ) : (
                <Link to={routeTo} className="hover:underline">{name.replace(/-/g, ' ')}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbTrail;
