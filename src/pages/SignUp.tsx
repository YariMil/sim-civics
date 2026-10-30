import SubscribeForm from '../components/SubscribeForm';
import { ACCOUNTS_ENABLED } from '../config/features';
import '../styles/sim-civics-tokens.css';
import './SignUp.css';

const COPY = ACCOUNTS_ENABLED
  ? {
      title: 'Create your account',
      body: 'Sim-Civics furthers local advocacy by helping you refine your ideas and send them to your council members for consideration!',
    }
  : {
      title: 'Join Sim-Civics',
      body: 'Get updates on council simulations and new learning modules. Sharing your council district helps us focus on what matters in your part of Los Angeles.',
    };

export default function SignUp() {
  return (
    <main className='sc-signup'>
      <div className='sc-signup__inner'>
        <div className='sc-heading'>
          <h1>Sign Up</h1>
          <span className='sc-heading__rule' aria-hidden='true' />
        </div>

        <div className='sc-signup__body'>
          <section className='sc-signup__intro'>
            <div className='sc-signup__bar' aria-hidden='true' />
            <h2>{COPY.title}</h2>
            <p>{COPY.body}</p>
          </section>
          <SubscribeForm />
        </div>
      </div>
    </main>
  );
}
