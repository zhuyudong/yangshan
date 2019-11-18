import React from 'react'
import { Row, Col, Panel, PanelGroup } from 'rsuite'

const sources = [{ title: 'React', description: 'React' }]

const Card = (props = (
  <Pannel {...props} bordered header={props.title}>
    <p>
      <smal>
        <a>{props.description}</a>
      </smal>
    </p>
  </Pannel>
))

const OpenSources = () => {
  return (
    <Row>
      {sources.map(i => (
        <Col md={6} sm={12}>
          <Card {...i} />
        </Col>
      ))}
    </Row>
  )
}

export default OpenSources
