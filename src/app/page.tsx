import Image from 'next/image'

export default function Home() {
  return (
<main>
  <p>My Api</p>
  <a href='/api/posts'>posts</a><br/>
  <a href='/api/users'>users</a><br/>
  <a href='/api/tasks'>tasks</a>
</main>
  )
}
