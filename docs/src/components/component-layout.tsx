import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Sidenav } from "./sidenav"

function Prop({ prop }) {
  return (
    <React.Fragment>
      <h4>
        {prop.name} {prop.required ? "(required)" : null}
      </h4>
      <code>{prop.type.name}</code>
      <p>{prop.description}</p>
    </React.Fragment>
  )
}

export default function ComponentLayout({ pageContext, children }) {
  const data = useStaticQuery(graphql`
    query {
      allComponentMetadata {
        nodes {
          displayName
          description
          props {
            name
            required
            description
            parent
            type {
              name
            }
          }
        }
      }
    }
  `)

  const components = React.useMemo(
    () =>
      data.allComponentMetadata.nodes.filter(node =>
        new RegExp(`^${pageContext.slug}(\..+)?$`).test(node.displayName)
      ),
    [data, pageContext.slug]
  )

  return (
    <div>
      <Sidenav />
      <h1>{pageContext.slug}</h1>
      {children}
      <h2>Props</h2>
      {components.map(component => (
        <React.Fragment key={component.displayName}>
          <details>
            <summary>
              <h3>{component.displayName}</h3>
            </summary>
            {component.props.map(prop => (
              <Prop key={prop.name} prop={prop} />
            ))}
          </details>
        </React.Fragment>
      ))}
    </div>
  )
}