import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/poles/$poleId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/pole/$poleId"!</div>
}
