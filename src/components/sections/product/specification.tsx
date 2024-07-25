import { DropletIcon, RulerIcon, ScissorsIcon, ShirtIcon } from 'lucide-react'
import React from 'react'

export const Specifications = () => {
  return (
    <div>
              <h2 className="text-2xl font-bold">Specifications</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <RulerIcon className="h-5 w-5 text-muted-foreground" />
                  <span>60% combed ringspun cotton, 40% polyester</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShirtIcon className="h-5 w-5 text-muted-foreground" />
                  <span>Machine washable</span>
                </div>
                <div className="flex items-center gap-2">
                  <DropletIcon className="h-5 w-5 text-muted-foreground" />
                  <span>Sweat-wicking fabric</span>
                </div>
                <div className="flex items-center gap-2">
                  <ScissorsIcon className="h-5 w-5 text-muted-foreground" />
                  <span>Relaxed fit</span>
                </div>
              </div>
            </div>
  )
}
