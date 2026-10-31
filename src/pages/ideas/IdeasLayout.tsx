import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/sim-civics-tokens.css';
import '../SignUp.css';
import './Ideas.css';

// Shared shell for every Ideas Workspace screen: section heading plus optional back link.
export default function IdeasLayout({
  back,
  children,
}: {
  back?: { to: string; label: string };
  children: ReactNode;
}) {
  return (
    <main className='sc-ideas'>
      <div className='sc-ideas__inner'>
        <div className='sc-heading'>
          <h1>Ideas Workspace</h1>
          <span className='sc-heading__rule' aria-hidden='true' />
        </div>
        {back && (
          <Link to={back.to} className='sc-ideas__back'>
            <span aria-hidden='true'>←</span> {back.label}
          </Link>
        )}
        {children}
      </div>
    </main>
  );
}
