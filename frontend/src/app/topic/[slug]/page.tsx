import Topic from "./Topic"


export default function TopicPage({ params }: { params: { slug: string } }) {
    return(
        <>
        <Topic slug={params.slug} />
        </>
    )
}