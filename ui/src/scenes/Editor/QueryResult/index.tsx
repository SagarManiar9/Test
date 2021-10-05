import React from "react"
import styled from "styled-components"

import { collapseTransition, Text, TransitionDuration } from "components"
import { color } from "utils"
import { Timings } from "utils/questdb"

type Props = Timings &
  Readonly<{
    count: number
    rowCount: number
  }>

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.2rem;
  overflow: hidden;
  ${collapseTransition};

  svg {
    margin-right: 0.2rem;
    color: ${color("draculaForeground")};
  }
`

const Details = styled.div`
  display: flex;
  background: ${color("draculaBackground")};
`

const DetailsColumn = styled.div`
  margin-left: 1rem;
`

const DetailsText = styled(Text)`
  margin-right: 0.5rem;
`

const roundTiming = (time: number): number =>
  Math.round((time + Number.EPSILON) * 100) / 100

const addColor = (timing: string) => {
  if (timing === "0") {
    return <Text color="gray2">0</Text>
  }

  return <Text color="draculaOrange">{timing}</Text>
}

const formatTiming = (nanos: number) => {
  if (nanos === 0) {
    return "0"
  }

  if (nanos > 1e9) {
    return `${roundTiming(nanos / 1e9)}s`
  }

  if (nanos > 1e6) {
    return `${roundTiming(nanos / 1e6)}ms`
  }

  if (nanos > 1e3) {
    return `${roundTiming(nanos / 1e3)}μs`
  }

  return `${nanos}ns`
}

const QueryResult = ({ compiler, count, execute, fetch, rowCount }: Props) => {
  return (
    <Wrapper _height={95} duration={TransitionDuration.FAST}>
      <div>
        <Text color="gray2">
          {rowCount.toLocaleString()} row{rowCount > 1 ? "s" : ""} in&nbsp;
          {formatTiming(fetch)}
        </Text>
      </div>
      <Details>
        <DetailsColumn>
          <DetailsText color="draculaForeground">
            Execute: {addColor(formatTiming(execute))}
          </DetailsText>
          <DetailsText color="draculaForeground">
            Network:&nbsp;
            {addColor(formatTiming(fetch - execute))}
          </DetailsText>
          <DetailsText color="draculaForeground">
            Total:&nbsp;
            {addColor(formatTiming(fetch))}
          </DetailsText>
        </DetailsColumn>
        <DetailsColumn>
          <DetailsText align="right" color="gray2" size="sm">
            Count: {formatTiming(count)}
          </DetailsText>
          <DetailsText align="right" color="gray2" size="sm">
            Compile: {formatTiming(compiler)}
          </DetailsText>
        </DetailsColumn>
      </Details>
    </Wrapper>
  )
}

export default QueryResult
