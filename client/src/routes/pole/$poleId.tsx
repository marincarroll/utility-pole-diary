import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pole/$poleId')({
  component: Pole,
})

function Pole() {
  return <div>Hello "/pole/$poleId"!</div>
}
