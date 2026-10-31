import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import '../styles/sim-civics-tokens.css';
import '../components/SubscribeForm.css';
import './SignUp.css';

export default function Account() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) return <main className='sc-signup' aria-busy='true' />;
  if (!user) return <Navigate to='/log-in' replace state={{ from: '/account' }} />;

  async function onLogout() {
    await logout();
    navigate('/');
  }

  return (
    <main className='sc-signup'>
      <div className='sc-signup__inner'>
        <div className='sc-heading'>
          <h1>Your Account</h1>
          <span className='sc-heading__rule' aria-hidden='true' />
        </div>

        <div className='sc-signup__body'>
          <section className='sc-signup__intro'>
            <div className='sc-signup__bar' aria-hidden='true' />
            <h2>You're signed in</h2>
            <p>Your account is where your progress on resources and your work in the Ideas Workspace will be saved.</p>
          </section>

          <div className='sc-form'>
            <h2 className='sc-form__title'>Account details</h2>
            <dl className='sc-account'>
              <dt>Email</dt>
              <dd>{user.email}</dd>
              <dt>LA Council District</dt>
              <dd>CD {user.district}</dd>
              <dt>Organization</dt>
              <dd>{user.affiliated === 'yes' && user.organization ? user.organization : 'None'}</dd>
              <dt>Email discoverable to other members</dt>
              <dd>{user.discoverable ? 'Yes' : 'No'}</dd>
            </dl>
            <button type='button' className='sc-form__submit' onClick={onLogout}>
              Log out
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
