'use client'

import { Project } from '@/payload-types'
import useClickableCard from '@/utilities/useClickableCard'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import Link from 'next/link'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { ExternalLinkIcon, GithubIcon } from 'lucide-react'

export type CardProjectData = Pick<Project, 'slug' | 'title'> & {
  Content?: Pick<
    NonNullable<Project['Content']>,
    'mainImage' | 'description' | 'projectUrl' | 'projectSourceUrl'
  >
}

export const ProjectCard: React.FC<{
  className?: string
  doc?: CardProjectData
  relationTo?: 'projects'
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard<HTMLDivElement>({})
  const { className, doc, relationTo, title: titleFromProps } = props
  const { slug, title, Content } = doc ?? {}
  const { mainImage, description, projectSourceUrl, projectUrl } = Content ?? {}
  const titleToUse = titleFromProps || title
  const href = `/${relationTo}/${slug}`

  return (
    <Card className={cn(' hover:cursor-pointer', className)} ref={card.ref}>
      <div className="relative w-full">
        {mainImage && typeof mainImage !== 'string' && <Media resource={mainImage} size="33vw" />}
      </div>
      <CardHeader className="prose">
        {titleToUse && (
          <CardTitle>
            <Link className="not-prose" href={href} ref={link.ref}>
              {titleToUse}
            </Link>
          </CardTitle>
        )}
        {description && (
          <div className="text-sm text-muted-foreground ">
            <RichText
              data={description}
              enableGutter={false}
              className="line-clamp-3 overflow-ellipsis"
            />
          </div>
        )}
      </CardHeader>
      <CardFooter className="max-md:flex-col gap-2">
        {projectUrl && (
          <Button asChild variant="default" className="w-full">
            <Link
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLinkIcon className="h-4 w-4" />
              <span>View Project</span>
            </Link>
          </Button>
        )}

        {projectSourceUrl && (
          <Button asChild variant="outline" className="w-full">
            <Link
              href={projectSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <GithubIcon className="h-4 w-4" />
              <span>View Source</span>
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
