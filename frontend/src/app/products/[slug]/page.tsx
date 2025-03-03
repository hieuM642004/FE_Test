import ProductDetail from "./ProductDetail"


export default function ProductDetailPage({ params }: { params: { slug: string } }) {
return (
    <>
    <ProductDetail slug={params.slug} />
    </>
)
}