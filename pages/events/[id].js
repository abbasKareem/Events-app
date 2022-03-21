import { FaPenAlt, FaTimes } from "react-icons/fa"
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import styles from "@/styles/Event.module.css"
import Image from "next/image"
import Link from "next/link"

export default function EventPage({ evt }) {
  const deleteEvent = () => {
    alert("delete")
  }
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPenAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {new Date(evt.attributes.date).toLocaleDateString("en-US")} at {evt.attributes.time}
        </span>
        <h1>{evt.attributes.name}</h1>

        <div className={styles.image}>
          {evt.attributes.image.data ? (
            <Image src={evt.attributes.image.data.attributes.formats.medium.url} width={960} height={600} />
          ) : <Image src="/images/event-default.png" width={960} height={600} />}
        </div>
        <h3>Performers:</h3>
        <p>{evt.attributes.performers}</p>
        <h3>Description:</h3>
        <p>{evt.attributes.description}</p>
        <h3>Venue: {evt.attributes.venue}</h3>
        <p>{evt.attributes.address}</p>

        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(
    `${API_URL}/api/event/?filters[id][$eq]=${id}&populate=*`
  )
  const events = await res.json()

  return {
    props: {
      evt: events.data[0],
    },
  }
}
