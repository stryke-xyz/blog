import { useRouter } from 'next/router'
import SbEditable from 'storyblok-react'
import Teaser from './Teaser'
import Grid from './Grid'
import Feature from './Feature'
import Page from './Page'
import Article from './Article'

// resolve Storyblok components to Next.js components
const Components = {
  teaser: Teaser,
  grid: Grid,
  feature: Feature,
  page: Page,
  article: Article,
}

const DynamicComponent = ({ blok }) => {
  const { isPreview } = useRouter()
  // check if component is defined above
  console.log(blok.component)
  if (typeof Components[blok.component] !== 'undefined') {
    const Component = Components[blok.component]

    // wrap with SbEditable for visual editing
    return isPreview ? (
      <SbEditable content={blok}>
        <Component blok={blok} />
      </SbEditable>
    ) : (
      <Component blok={blok} />
    )
  }

  // fallback if the component doesn't exist
  return (
    <p>
      The component <strong>{blok.component}</strong> has not been created yet.
    </p>
  )
}

export default DynamicComponent
