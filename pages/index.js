import Layout from "@/components/Layout"
import EventItem from "@/components/EventItem"
import { API_URL } from "@/config/index"
import Link from "next/link"
export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No Events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(
    `${API_URL}/api/event?sort=date:DESC&pagination[page]=1&pagination[pageSize]=3&populate=*`
  )
  const events = await res.json()
  console.log(events)

  return {
    props: {
      events: events.data,
    },
  }
}
