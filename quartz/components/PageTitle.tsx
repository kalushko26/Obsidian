import { pathToRoot, joinSegments } from "../util/path"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function PageTitle({ fileData, cfg, displayClass }: QuartzComponentProps) {
  const title = cfg?.pageTitle ?? "Untitled Quartz"
  const baseDir = pathToRoot(fileData.slug!)
  const iconPath = joinSegments(baseDir, "static/logo.png")

  return (
    <h1 class={`page-title ${displayClass ?? ""}`}>
      <a href={baseDir}>
        {iconPath && <img src={iconPath ?? cfg?.logo} alt={title} class="page-logo" />}
      </a>
    </h1>
  )
}

PageTitle.css = `
.page-title {
  margin: 0;
}

.page-logo {
  height: 128px;
  width: 128px;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
