import styles from './loading.module.css';

const Loading = ({ dataTestid }: { dataTestid?: string }) => (
  <div data-testid={dataTestid} className={styles.loadingContainer}>
    <div className={styles.loading} />
  </div>
);

export default Loading;
