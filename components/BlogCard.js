import Link from "next/link";
import styles from "../styles/BlogCard.module.css";

export default function BlogPost({
  title,
  author,
  coverPhoto,
  datePublished,
  slug,
}) {
  return (
    <div className={styles.card}>
      <Link href={`/posts/${slug}`}>
        <div className={styles.imgContainer}>
          <img src={coverPhoto.url} alt=""></img>
        </div>
        <div className={styles.text}>
          <h2>{title}</h2>
          <div className={styles.details}>
            <div className={styles.date}>
              <h3>{datePublished}</h3>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
