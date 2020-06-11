import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import { FaCode } from 'react-icons/fa'
import { StaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image/withIEPolyfill'
import styled from 'styled-components'

let StyledImg = styled(props => <Img {...props}/>)`
  perspective: 1500px;
  perspective-origin: left center;
  overflow: visible !important;
  picture, img {
    transform: rotateY(-35deg) rotateX(15deg);
    box-shadow: 25px 60px 125px -25px rgba(80,102,144,.1), 16px 40px 75px -40px rgba(0,0,0,.2);
    border-radius: .625rem;
    transition: 1s !important;
    &:hover {
      transform: rotateY(-30deg) rotateX(15deg);
    }
  }
`

let Benefit = ({title, content}) => (
  <div className="d-flex mb-4">
    <FaCode size={30} className="text-primary"/>
    <div className="ml-3">
      <h4>{title}</h4>
      <p className="m-0 text-muted">{content}</p>
    </div>
  </div>
)

let Benefits = ({data}) => (
  <Container className="py-5">
    <Row className="d-flex align-items-center">
      <Col md="6">
        <div className="mb-4">
          <h2 className="text-primary">Technologies</h2>
          <p className="text-muted">Full Stack App Hosted on AWS and CloudFlare</p>
        </div>
        <Benefit title="React.js" content="Blazing fast front-end side!!"/>
        <Benefit title="Electron.js" content="App package available for hosts!"/>
        <Benefit title="Gatsby.js" content="Used to serve this static webpage through S3 and CloudFront!"/>
        <Benefit title="Socket.IO" content="Real Time broadcasts the instrument info to every client!"/>
        <Benefit title="Express Router" content="Express.js based back-end router for the API!"/>
        <Benefit title="Teensy 4" content="The most powerful board on the market for realtime Audio Analysis!"/>
        <Benefit title="Docker" content="Container based solutions for fast start-up and Compose solution!"/>
        <Benefit title="Cloudflare" content="Each endpoint is proxied through CloudFlare for Content Caching!"/>
      </Col>
      <Col md="6">
        <StyledImg fluid={data.file.childImageSharp.fluid} objectFit="contain" objectPosition="50% 50%"/>
      </Col>
    </Row>
  </Container>
)

export default () => (
  <StaticQuery
    query={graphql`
      query BenefitsQuery {
        file(relativePath: {eq: "sample.png"}) {
          id
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => (
      <Benefits data={data}/>
    )}
  />
)
