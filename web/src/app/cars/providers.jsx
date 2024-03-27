// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import "@/tailwind/output.css"

export function Providers({children}) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}