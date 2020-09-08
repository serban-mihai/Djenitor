import React from "react"

import { Container, Row, Col } from 'reactstrap'
import Link from '../components/link'
import Button from '../components/btn'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { FaGithub, FaGuitar, FaLinux, FaWindows, FaApple, FaDocker } from 'react-icons/fa'
import Form from '../components/form'
import Slider from '../components/slider'
import Box from '../components/box'
import Hr from '../components/hr'
import { FaHome } from 'react-icons/fa';
import Benefits from '../components/benefits'
import styled from 'styled-components'

let StyledBackground = styled.div`
  background: linear-gradient(to bottom,#f9fbfd 0,#fff 100%);
`

let Service = ({title, icon, to}) => (
  <Col>
    <Link to={to}>
      <Box>
        {{
          "linux": <FaLinux size={30}></FaLinux>,
          "windows": <FaWindows size={30}></FaWindows>,
          "mac": <FaApple size={30}></FaApple>
        }[icon]}
        <h4 className="mt-3">{title}</h4>
      </Box>
    </Link>
  </Col>
)

export default () => (
  <Layout>
    <SEO title="Home" />
    <Slider/>
    <Container className="pt-4">
      <div className="text-center">
        <h4>A Real Time Instrument Virtualization Tool</h4>
        <p className="text-muted">University Degree Project</p>
        <Button to="https://live.djenitor.com" className="btn btn-primary btn-lg">
        <FaGuitar className="mr-1"/>
        Go Live
      </Button>
      </div>
    </Container>
    <Container className="py-5">
      <h2 className="text-center mb-4">Get the App</h2>
      <Row>
        <Service icon="linux" title="GNU/Linux" to="https://djenitor-releases.s3.amazonaws.com/Djenitor-0.1.0.AppImage"/>
        <Service icon="windows" title="Windows" to="https://djenitor-releases.s3.amazonaws.com/Djenitor-0.1.0.exe"/>
        <Service icon="mac" title="MacOS" to="https://djenitor-releases.s3.amazonaws.com/Djenitor-0.1.0.app"/>
      </Row>
    </Container>
    <div className="text-center py-5">
    <h2 className="text-center mb-4">or use Containers!</h2>
      <Button to="https://github.com/serban-mihai/Djenitor" className="btn btn-primary btn-lg">
        <FaGithub className="mr-1"/>
        View on Github
      </Button>
    </div>
    <StyledBackground>
      <Benefits/>
      <div className="py-5"></div>
    </StyledBackground>
  </Layout>
)
