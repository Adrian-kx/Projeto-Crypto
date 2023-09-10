import { Link } from "react-router-dom";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.container}>
      <Link  className={styles.title} to='/'>
        <h1>Crypto Project Adrian</h1>
      </Link>
    </header>
  );
}
