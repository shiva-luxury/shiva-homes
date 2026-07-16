'use client'

import { useState } from 'react'
import LeadFormModal, { LeadType } from './LeadFormModal'

export default function LeadFormLink({ type, children }: { type: LeadType; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <span onClick={() => setOpen(true)} className="cursor-pointer">{children}</span>
      {open && <LeadFormModal type={type} onClose={() => setOpen(false)} />}
    </>
  )
}
