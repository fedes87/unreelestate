import styles from './SocialBanner.module.css'

export default function SocialBanner() {
  return (
    <div className={styles.banner}>
      <span className={styles.text}>Follow our journey</span>
      <div className={styles.icons}>
        <a href="https://www.instagram.com/unreel_estate" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
        </a>
        <a href="https://www.facebook.com/profile.php?id=61576479466293" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
        </a>
      </div>
    </div>
  )
}
