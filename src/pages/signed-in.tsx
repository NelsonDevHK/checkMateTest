import {GetServerSideProps, InferGetServerSidePropsType} from "next";

export default function SignedIn({ joke }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1>Signed In</h1>
      {/* Task 3: Your own presentation of the joke here (Free Style 😉 )*/}
      {joke.map((q, index) =>(
        <div key={index}>
          <h1>{q.setup}</h1>
          <h1>{q.punchline}</h1>
        </div>
      ))}
      {/* End of Task 3 */}
    </div>
  )

}

// Task 2: Fetch random jokes from the API
// https://official-joke-api.appspot.com/jokes/programming/random
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API and pass it to the page via props.joke
  const res = await fetch('https://official-joke-api.appspot.com/jokes/programming/random/?q=${context.params.query}');
  const data = await res.json();
  console.log({data});
  return {
    props: {
      joke : data
    }, // will be passed to the page component as props
  }
}