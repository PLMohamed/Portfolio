import { Project } from '@/payload-types'
import { revalidatePath, revalidateTag } from 'next/cache'
import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const revalidateProject: CollectionAfterChangeHook<Project> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate && doc.slug) {
    const path = `/projects/${doc.slug}`

    payload.logger.info(`Revalidating project at path: ${path}`)

    revalidatePath(path)
    revalidateTag('projects-sitemap')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Project> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate && doc.slug) {
    const path = `/projects/${doc.slug}`

    payload.logger.info(`Revalidating project deletion at path: ${path}`)

    revalidatePath(path)
    revalidateTag('projects-sitemap')
  }
  return doc
}
