import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GraphQLClient, gql } from "graphql-request";
import BlogCard from "../components/BlogCard";

const graphcms = new GraphQLClient(
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cld0ggs2702ss01ru8so25vnr/master"
);

const QUERY = gql`
  {
    posts {
      id
      title
      datePublished
      slug
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      coverPhoto {
        publishedAt
        createdBy {
          id
        }
        url
      }
    }
  }
`;

export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 30,
  };
}

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pantomime</title>
        <meta name="description" content="Sui generis." />
        <link rel="icon" href="/favicon.ico?" />
      </Head>
      <header className={styles.headerLogo}>
        <div className={styles.logoContainer}>
          <img src="/pantomime_logo_squashed.png"></img>
        </div>
        <p>Infila la mano, non morde mica.</p>
      </header>
      <main className={styles.main}>
        {posts.map((post) => (
          <BlogCard
            title={post.title}
            coverPhoto={post.coverPhoto}
            key={post.id}
            datePublished={post.datePublished}
            slug={post.slug}
          />
        ))}
      </main>
    </div>
  );
}
