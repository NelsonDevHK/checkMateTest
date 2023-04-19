import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import { text } from "stream/consumers";

export default function SignedIn({ joke }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: '#8EA7E9', fontFamily: 'Roboto', color: '#FFF2F2' }}>
  <h1 style={{ textAlign: 'center' }}>Signed In</h1>
  {/* Task 3: Your own presentation of the joke here (Free Style 😉 )*/}
  {joke.map((q, index) => (
    <div
      className="box"
      key={index}
      style={{ margin: '10px', padding: '10px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#8EA7E9' }}
    >
      <h1>{q.setup}</h1>
      <h1 style={{ color: '#8EA7E9',transition: 'color 0.3s ease-in-out', border: '1px solid #E5E0FF',padding:'15px'}
    }
    onMouseEnter={(e) => e.target.style.color = '#FFF2F2'}
    onMouseLeave={(e) => e.target.style.color = '#8EA7E9'}>{q.punchline}</h1>
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
  return {
    props: {
      joke : data
    }, // will be passed to the page component as props
  }
}