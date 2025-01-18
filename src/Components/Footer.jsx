import React from 'react'
import styled from 'styled-components'

const FOOTER = styled.div`
    text-align:center;
    background-color:#f7b61e;
    padding:3px 0;
    span{
        font-size:16px;
        font-family: "Roboto", serif;
        color:#fff;
    }
`

const Footer = () => {
  return (
    <div>
      <FOOTER>
            <span>Copyrights 2025</span>
      </FOOTER>
    </div>
  )
}

export default Footer
