import { useEffect, useState } from "preact/hooks"
import { pathToRoot, joinSegments } from "../util/path"
import { joinStyles } from "../util/theme"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
// import { currentTheme } from "./scripts/darkmode.inline"

function PageTitle({ fileData, cfg, displayClass }: QuartzComponentProps) {
  const title = cfg?.pageTitle ?? "Untitled Quartz"
  const baseDir = pathToRoot(fileData.slug!)

  return (
    <h1 class={`page-title ${displayClass ?? ""}`}>
      <a href={baseDir}>
        <span class="page-logo" />
      </a>
    </h1>
  )
}

PageTitle.css = `
.page-title {
  margin: 0;
}

.page-logo {
  display: block;
  width: 256px;
  height: 128px;
  background-image: var(--icon);
  background-size: contain;
  background-repeat: no-repeat;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
