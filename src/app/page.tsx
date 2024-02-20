import styles from "./page.module.css";

import { GraphQLClient } from "graphql-request";

import { graphql } from "@/gql";

const client = new GraphQLClient("https://swapi-graphql.netlify.app/.netlify/functions/index", { fetch });

export default async function Home() {
  const document = graphql(`
    query Query {
      allFilms {
        films {
          title
          director
          releaseDate
          speciesConnection {
            species {
              name
              classification
              homeworld {
                name
              }
            }
          }
        }
      }
    }
  `);

  const r = await client.request(document);

  return (
    <main className={styles.main}>
      {r.allFilms?.films?.map((film) => (
        <>
          <h2>{film?.title}</h2>
          <dl>
            <dt>title</dt>
            <dd>{film?.title}</dd>
            <dt>director</dt>
            <dd>{film?.director}</dd>
            <dt>release date</dt>
            <dd>{film?.releaseDate}</dd>
          </dl>
        </>
      ))}
    </main>
  );
}
