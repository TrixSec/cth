import { notFound } from "next/navigation"
import { tools } from "@/lib/tools-data"
import { ToolPageWrapper } from "@/components/tool-page-wrapper"

interface ToolPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }))
}

export async function generateMetadata({ params }: ToolPageProps) {
  const tool = tools.find((t) => t.slug === params.slug)

  if (!tool) {
    return {
      title: "Tool Not Found",
    }
  }

  return {
    title: `${tool.name} - Cipher Tools Hub`,
    description: tool.description,
    keywords: `${tool.name}, ${tool.category}, online tool, cipher tools hub`,
  }
}

export default async function ToolPage({ params }: ToolPageProps) {
  const tool = tools.find((t) => t.slug === params.slug)
  if (!tool) notFound()

  let ToolComponent

  try {
    const importedModule = await import(`@/app/tool/${params.slug}/page`)
    ToolComponent = importedModule.default
  } catch (error) {
    notFound() // fallback to 404 page
  }

  return (
    <ToolPageWrapper tool={tool}>
      <ToolComponent />
    </ToolPageWrapper>
  )
}
