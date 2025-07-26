import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'
import { ProjectCard, CardProjectData } from '@/components/Card/ProjectCard'

export type Props = {
  posts?: CardPostData[]
  projects?: CardProjectData[]
  relationTo?: 'posts' | 'projects'
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, projects, relationTo = 'posts' } = props

  const items = relationTo === 'posts' ? posts : projects

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {items?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  {relationTo === 'posts' ? (
                    <Card
                      className="h-full"
                      doc={result as CardPostData}
                      relationTo="posts"
                      showCategories
                    />
                  ) : (
                    <ProjectCard
                      className="h-full"
                      doc={result as CardProjectData}
                      relationTo="projects"
                    />
                  )}
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
